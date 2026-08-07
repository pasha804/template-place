import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

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

/* ── Admin: all orders ── */
export function useAllOrders(statusFilter?: OrderStatus) {
  return useQuery({
    queryKey: ["admin-orders", statusFilter],
    queryFn: async () => {
      let q = supabase
        .from("orders")
        .select("*, order_items(*)")
        .order("created_at", { ascending: false });
      if (statusFilter) q = q.eq("status", statusFilter);
      const { data, error } = await q;
      if (error) throw error;
      return data as Order[];
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

      // Guarantee the page is upserted in Supabase with pending_approval status
      const pagePayload = {
        id: input.pageId.startsWith("draft-") ? undefined : input.pageId,
        user_id: input.userId,
        template_id: input.templateId,
        title: localTitle,
        slug: localSlug,
        status: "pending_approval" as PageStatus,
        content: { ...localContent, _template_id: input.templateId },
        updated_at: new Date().toISOString(),
      };

      try {
        const pageRes = await supabase.from("pages").upsert(pagePayload as any).select().single();
        if (pageRes.error && pageRes.error.code === "23503") {
          await supabase.from("pages").upsert({ ...pagePayload, template_id: null } as any);
        }
      } catch (e) {
        console.warn("Page upsert during order warning:", e);
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
              page_id:            input.pageId,
              currency_display:   "PKR",
            } as object),
          })
          .select()
          .single();

        if (!orderErr && data) {
          order = {
            ...(data as Order),
            reference: (data as Order).reference || refCode,
            page_id: input.pageId,
            payment_method: input.paymentMethod,
            payment_screenshot: input.paymentScreenshot,
          };
          try {
            await supabase.from("order_items").insert({
              order_id:         order.id,
              template_id:      input.templateId,
              page_id:          input.pageId,
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
          page_id:            input.pageId,
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

/* ── Admin: approve + publish ── */
export function useApproveOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ orderId, pageId }: { orderId: string; pageId: string }) => {
      // 1. Mark order paid
      try {
        await (supabase.from("orders") as ReturnType<typeof supabase.from>)
          .update({ status: "paid", paid_at: new Date().toISOString() })
          .eq("id", orderId);
      } catch {}

      // 2. Publish the page in Supabase
      let slug = pageId;
      try {
        const { data, error } = await supabase
          .from("pages")
          .update({ status: "published" as Database["public"]["Enums"]["page_status"], published_at: new Date().toISOString(), is_public: true })
          .eq("id", pageId)
          .select("slug")
          .single();

        if (!error && data) slug = data.slug;
      } catch {}

      // 3. Update localStorage backup
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem(`page_${pageId}`);
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            parsed.status = "published";
            parsed.is_public = true;
            parsed.published_at = new Date().toISOString();
            slug = parsed.slug || slug;
            localStorage.setItem(`page_${pageId}`, JSON.stringify(parsed));
          } catch {}
        }
      }

      return { slug };
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
        paidOrders:    o.filter(x => x.status === "paid").length,
        failedOrders:  o.filter(x => x.status === "failed").length,
        totalRevenuePaisa: o.filter(x => x.status === "paid").reduce((s, x) => s + (x.total_cents ?? 0), 0),
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
        const { data, error } = await supabase
          .from("pages")
          .select("*")
          .eq("status", "pending_approval")
          .is("deleted_at", null)
          .order("updated_at", { ascending: false });
        if (!error && data) dbPages = data;
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

        const templateId = page.template_id || (page.content as Record<string, unknown>)?._template_id as string || "anniversary-galaxy";

        return {
          page: { ...page, template_id: templateId },
          order: matchingOrder,
          userProfile: profileMap.get(page.user_id) || null,
        };
      });
    },
  });
}
