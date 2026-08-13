import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import { runPublishPipeline, isValidUUID } from "@/lib/publish-pipeline";

type Order = Database["public"]["Tables"]["orders"]["Row"] & {
  payment_method?: string;
  payment_screenshot?: string;
  whatsapp_sent?: boolean;
  admin_notes?: string;
  page_id?: string;
  currency_display?: string;
  order_items?: any[];
};
type OrderStatus = Database["public"]["Enums"]["order_status"];
type PageStatus = Database["public"]["Enums"]["page_status"];

/* ── Pricing constants in PKR (stored as paisa = 1/100 PKR) ── */
export const PLANS_PKR = [
  {
    key:          "basic",
    label:        "Package 1",
    pricePKR:     1000,
    pricePaisa:   100000,
    features:     ["1 personalized page", "Full customization", "WhatsApp sharing", "Standard support"],
    popular:      false,
  },
  {
    key:          "premium",
    label:        "Package 2",
    pricePKR:     2000,
    pricePaisa:   200000,
    features:     ["1 personalized page", "Full customization", "Custom URL slug", "Priority support", "VIP delivery"],
    popular:      true,
  },
] as const;

export function formatPKR(paisa: number) {
  return `Rs. ${(paisa / 100).toLocaleString("en-PK")}`;
}

/* ── User's own orders ── */
export function useUserOrders(userId: string | undefined) {
  return useQuery({
    queryKey: ["orders", userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Order[];
    },
    enabled: !!userId,
  });
}

/* ── Single order by id ── */
export function useOrder(orderId: string | undefined) {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      if (!orderId) return null;
      const { data, error } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .eq("id", orderId)
        .single();
      if (error) throw error;
      return data as Order;
    },
    enabled: !!orderId,
  });
}

/* ── Admin: all orders with Realtime Sync ── */
export function useAllOrders(statusFilter?: OrderStatus) {
  const qc = useQueryClient();

  useEffect(() => {
    // Realtime Supabase Postgres channel for instant order updates
    const channel = supabase
      .channel("admin-orders-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        () => {
          qc.invalidateQueries({ queryKey: ["admin-orders"] });
          qc.invalidateQueries({ queryKey: ["pending-websites"] });
          qc.invalidateQueries({ queryKey: ["admin-stats"] });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [qc]);

  return useQuery({
    queryKey: ["admin-orders", statusFilter],
    refetchInterval: 10000, // Auto refresh every 10s
    queryFn: async () => {
      let ordersList: Order[] = [];

      try {
        let q = supabase
          .from("orders")
          .select("*, order_items(*)")
          .order("created_at", { ascending: false });
        if (statusFilter) q = q.eq("status", statusFilter);
        const { data, error } = await q;
        if (!error && data) {
          ordersList = data as Order[];
        }
      } catch (err) {
        console.warn("[Orders Fetch Join Warning]:", err);
      }

      // Fallback query without foreign key join if main join returned empty/error
      if (ordersList.length === 0) {
        try {
          let q2 = supabase
            .from("orders")
            .select("*")
            .order("created_at", { ascending: false });
          if (statusFilter) q2 = q2.eq("status", statusFilter);
          const { data: data2 } = await q2;
          if (data2) {
            ordersList = data2 as Order[];
          }
        } catch {}
      }

      return ordersList;
    },
  });
}

/* ── Place order (user submits after editing) ── */
export function usePlaceOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      userId:            string;
      pageId:            string;
      templateId:        string;
      templateName:      string;
      planKey:           string;
      pricePaisa:        number;
      paymentMethod:     string;
      paymentScreenshot: string;
    }) => {
      const plan = PLANS_PKR.find(p => p.key === input.planKey) ?? PLANS_PKR[1];
      const refCode = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;

      // Retrieve local storage page data to sync if needed
      let localTitle = input.templateName;
      let localSlug = input.pageId;
      let localContent: Record<string, unknown> = {};

      if (typeof window !== "undefined") {
        const cached = localStorage.getItem(`page_${input.pageId}`);
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            localTitle = parsed.title || input.templateName;
            localSlug = parsed.slug || input.pageId;
            localContent = parsed.content || {};
            parsed.status = "pending_approval";
            parsed.updated_at = new Date().toISOString();
            localStorage.setItem(`page_${input.pageId}`, JSON.stringify(parsed));
          } catch {}
        }
      }

      // Guarantee valid UUID for page ID in Supabase
      const isUuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(input.pageId);
      let pageIdToUse = isUuid ? input.pageId : crypto.randomUUID();

      const pagePayload = {
        id: pageIdToUse,
        user_id: input.userId,
        template_id: input.templateId,
        title: localTitle,
        slug: localSlug,
        status: "pending_approval" as PageStatus,
        content: { ...localContent, _template_id: input.templateId },
        updated_at: new Date().toISOString(),
      };

      try {
        const pageRes = await supabase.from("pages").upsert(pagePayload as any).select("id, slug, status").single();
        if (pageRes.data?.id) {
          pageIdToUse = pageRes.data.id;
        } else if (pageRes.error) {
          console.error("Page upsert error during order:", pageRes.error);
          throw new Error("Page upsert failed: " + pageRes.error.message);
        }
      } catch (e) {
        console.error("Page upsert exception:", e);
        throw e;
      }

      let order: Order | null = null;
      try {
        const { data, error: orderErr } = await (supabase
          .from("orders") as ReturnType<typeof supabase.from>)
          .insert({
            user_id:          input.userId,
            reference:        refCode,
            status:           "pending" as OrderStatus,
            plan_kind:        "one_time",
            currency:         "PKR",
            subtotal_cents:   plan.pricePaisa,
            discount_cents:   0,
            total_cents:      plan.pricePaisa,
            provider:         input.paymentMethod,
            ...({
              payment_method:     input.paymentMethod,
              payment_screenshot: input.paymentScreenshot,
              page_id:            pageIdToUse,
              currency_display:   "PKR",
            } as object),
          })
          .select()
          .single();

        if (!orderErr && data) {
          order = {
            ...(data as Order),
            reference: (data as Order).reference || refCode,
            page_id: pageIdToUse,
            payment_method: input.paymentMethod,
            payment_screenshot: input.paymentScreenshot,
          };
          try {
            await supabase.from("order_items").insert({
              order_id:         order.id,
              template_id:      input.templateId,
              page_id:          pageIdToUse,
              label:            input.templateName,
              quantity:         1,
              unit_price_cents: plan.pricePaisa,
            });
          } catch {}
        }
      } catch (e) {
        console.warn("Order insert warning:", e);
      }

      if (!order) {
        order = {
          id:                 `order-${Date.now()}`,
          reference:          refCode,
          user_id:            input.userId,
          status:             "pending",
          plan_kind:          "one_time",
          currency:           "PKR",
          subtotal_cents:     plan.pricePaisa,
          discount_cents:     0,
          total_cents:        plan.pricePaisa,
          provider:           input.paymentMethod,
          payment_method:     input.paymentMethod,
          payment_screenshot: input.paymentScreenshot,
          page_id:            pageIdToUse,
          created_at:         new Date().toISOString(),
        } as Order;
      }

      return order;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["orders", (data as Order).user_id] });
      qc.invalidateQueries({ queryKey: ["pages"] });
    },
  });
}

/* ── Mark WhatsApp sent ── */
export function useMarkWhatsappSent() {
  return useMutation({
    mutationFn: async (orderId: string) => {
      await supabase.from("orders").update({ whatsapp_sent: true } as never).eq("id", orderId);
    },
  });
}

/* ── Admin: verify payment proof (step 2) ── */
export function useVerifyPayment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ orderId }: { orderId: string }) => {
      const { error } = await (supabase.from("orders") as ReturnType<typeof supabase.from>)
        .update({ status: "payment_verified" })
        .eq("id", orderId);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-orders"] });
      qc.invalidateQueries({ queryKey: ["pending-websites"] });
      qc.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });
}

/* ── Admin: approve + publish (step 3) ── */
export function useApproveOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ orderId, pageId }: { orderId: string; pageId: string }) => {
      // 1. Fetch page data from Supabase or localStorage fallback
      let pageRecord: Database["public"]["Tables"]["pages"]["Row"] | null = null;
      if (isValidUUID(pageId)) {
        try {
          const { data } = await supabase.from("pages").select("id, user_id, template_id, slug, title, status, content, theme, blocks, seo_title, seo_description, og_image_url, password_hash, pin_code, is_public, published_at, deleted_at, view_count, created_at, updated_at").eq("id", pageId).maybeSingle();
          if (data) pageRecord = { ...data, expires_at: null } as any;
        } catch {}
      }

      if (!pageRecord && typeof window !== "undefined") {
        const cached = localStorage.getItem(`page_${pageId}`);
        if (cached) {
          try { pageRecord = JSON.parse(cached); } catch {}
        }
      }

      if (!pageRecord) {
        throw new Error(`Page record #${pageId} not found in database or local backup.`);
      }

      const userId = pageRecord.user_id;
      const templateId = pageRecord.template_id || ((pageRecord.content as Record<string, unknown>)?._template_id as string) || pageRecord.template_id;
      const title = pageRecord.title || "Untitled Dedicated Website";
      const slug = pageRecord.slug || pageId;
      const content = (pageRecord.content as Record<string, unknown>) || {};

      // 2. Run Atomic Publish Pipeline
      const pubResult = await runPublishPipeline({
        pageId,
        userId,
        templateId,
        title,
        slug,
        content,
      });

      if (!pubResult.success) {
        throw new Error(pubResult.error || "Failed to publish page.");
      }

      // 3. Mark order as paid
      try {
        await (supabase.from("orders") as ReturnType<typeof supabase.from>)
          .update({ status: "paid", paid_at: new Date().toISOString() })
          .eq("id", orderId);
      } catch {}

      // 4. Backup localStorage
      if (typeof window !== "undefined") {
        try {
          const cached = localStorage.getItem(`page_${pubResult.pageId}`);
          if (cached) {
            const parsed = JSON.parse(cached);
            parsed.status = "published";
            parsed.is_public = true;
            parsed.published_at = new Date().toISOString();
            parsed.slug = pubResult.slug;
            localStorage.setItem(`page_${pubResult.pageId}`, JSON.stringify(parsed));
          }
        } catch {}
      }

      return { slug: pubResult.slug, pageId: pubResult.pageId };
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-orders"] });
      qc.invalidateQueries({ queryKey: ["admin-pages"] });
      qc.invalidateQueries({ queryKey: ["pending-websites"] });
      qc.invalidateQueries({ queryKey: ["admin-stats"] });
      qc.invalidateQueries({ queryKey: ["pages"] });
    },
  });
}

/* ── Admin: reject ── */
export function useRejectOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ orderId, pageId, notes }: { orderId: string; pageId: string; notes?: string }) => {
      await (supabase.from("orders") as ReturnType<typeof supabase.from>)
        .update({ status: "failed", admin_notes: notes ?? "Payment could not be verified" })
        .eq("id", orderId);
      await supabase.from("pages")
        .update({ status: "draft" as Database["public"]["Enums"]["page_status"] })
        .eq("id", pageId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-orders"] });
      qc.invalidateQueries({ queryKey: ["admin-stats"] });
    },
  });
}

/* ── Admin: request changes ── */
export function useRequestChanges() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ orderId, notes }: { orderId: string; notes: string }) => {
      const { data: order } = await (supabase.from("orders") as ReturnType<typeof supabase.from>)
        .select("page_id")
        .eq("id", orderId)
        .single();
      await (supabase.from("orders") as ReturnType<typeof supabase.from>)
        .update({ admin_notes: notes })
        .eq("id", orderId);
      if ((order as Order)?.page_id) {
        await supabase.from("pages")
          .update({ status: "draft" as Database["public"]["Enums"]["page_status"] })
          .eq("id", (order as Order).page_id as string);
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-orders"] });
    },
  });
}

/* ── Admin: unpublish / expire ── */
export function useUnpublishPage() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (pageId: string) => {
      await supabase.from("pages")
        .update({ status: "archived" as Database["public"]["Enums"]["page_status"], is_public: false })
        .eq("id", pageId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-orders"] });
    },
  });
}

/* ── Admin stats ── */
export function useAdminStats() {
  return useQuery({
    queryKey: ["admin-stats"],
    refetchInterval: 10000, // Auto refresh every 10s
    queryFn: async () => {
      const [orders, pages, users] = await Promise.all([
        supabase.from("orders").select("id, status, total_cents"),
        supabase.from("pages").select("id, status"),
        supabase.from("profiles").select("id"),
      ]);

      const o = orders.data ?? [];
      const p = pages.data ?? [];

      return {
        totalOrders:   o.length,
        pendingOrders: o.filter(x => x.status === "pending").length,
        verifiedOrders: o.filter(x => (x.status as string) === "payment_verified").length,
        paidOrders:    o.filter(x => x.status === "paid").length,
        failedOrders:  o.filter(x => x.status === "failed").length,
        totalRevenuePaisa: o.filter(x => x.status === "paid" || (x.status as string) === "payment_verified").reduce((s, x) => s + (x.total_cents ?? 0), 0),
        publishedPages: p.filter(x => x.status === "published").length,
        pendingPages:   p.filter(x => x.status === "pending_approval").length,
        totalUsers:    (users.data ?? []).length,
      };
    },
  });
}

/* ── Admin: fetch all pending approval pages with associated orders & profile info ── */
export function usePendingWebsites() {
  return useQuery({
    queryKey: ["pending-websites"],
    queryFn: async () => {
      let dbPages: Database["public"]["Tables"]["pages"]["Row"][] = [];
      try {
        // Select specific columns to avoid issues with missing expires_at in old production DBs
        const { data, error } = await supabase
          .from("pages")
          .select("id, user_id, template_id, slug, title, status, content, theme, blocks, seo_title, seo_description, og_image_url, password_hash, pin_code, is_public, published_at, deleted_at, view_count, created_at, updated_at")
          .eq("status", "pending_approval")
          .is("deleted_at", null)
          .order("updated_at", { ascending: false });
        if (!error && data) dbPages = data as any[];
      } catch (e) {
        console.warn("Supabase fetch pending pages warning:", e);
      }

      // Merge local storage pending_approval pages
      const localPages: Database["public"]["Tables"]["pages"]["Row"][] = [];
      if (typeof window !== "undefined") {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith("page_")) {
            try {
              const item = JSON.parse(localStorage.getItem(key) || "{}");
              if (item && item.id && item.status === "pending_approval") {
                localPages.push(item);
              }
            } catch {}
          }
        }
      }

      const dbIds = new Set(dbPages.map(p => p.id));
      const missingLocal = localPages.filter(p => !dbIds.has(p.id));
      const pendingPages = [...dbPages, ...missingLocal];

      // Fetch all orders
      const { data: orders } = await supabase
        .from("orders")
        .select("*, order_items(*)")
        .order("created_at", { ascending: false });

      // Fetch user profiles
      const userIds = Array.from(new Set(pendingPages.map(p => p.user_id)));
      const { data: profiles } = userIds.length > 0
        ? await supabase.from("profiles").select("*").in("id", userIds)
        : { data: [] };

      const allOrders = (orders ?? []) as Order[];
      const profileMap = new Map((profiles ?? []).map(p => [p.id, p]));

      return pendingPages.map(page => {
        const matchingOrder = allOrders.find(o => 
          o.page_id === page.id || 
          o.order_items?.some((item: { page_id?: string }) => item.page_id === page.id)
        ) || null;

        // CRITICAL: Use explicit template_id or content._template_id without random fallback
        const templateId = page.template_id || 
          (page.content as Record<string, unknown>)?._template_id as string;

        if (!templateId) {
          console.error("Page missing template_id:", page.id, page.slug);
        }

        return {
          page: { ...page, template_id: templateId || page.template_id },
          order: matchingOrder,
          userProfile: profileMap.get(page.user_id) || null,
        };
      });
    },
  });
}
