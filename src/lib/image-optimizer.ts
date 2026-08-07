/**
 * image-optimizer.ts — Client-side HTML5 canvas image compression, format conversion, and file validation.
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0 to 1
  mimeType?: "image/webp" | "image/jpeg" | "image/png";
}

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

/**
 * Validates file size (max 5MB) and type.
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: "No file selected." };
  }
  if (!file.type.startsWith("image/")) {
    return { valid: false, error: "File must be a valid image (PNG, JPG, WebP, etc.)." };
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
    return { valid: false, error: `Image is too large (${sizeMb} MB). Maximum size allowed is 5 MB.` };
  }
  return { valid: true };
}

/**
 * Reads an image file and compresses/resizes it using Canvas to WebP/JPEG data URL.
 */
export async function compressImage(file: File, options: CompressionOptions = {}): Promise<string> {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const {
    maxWidth = 1920,
    maxHeight = 1920,
    quality = 0.82,
    mimeType = "image/webp",
  } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error("Failed to read image file."));

    reader.onload = (event) => {
      const img = new Image();
      img.onerror = () => reject(new Error("Failed to process image format."));

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate aspect ratio scaling if dimensions exceed max bounds
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          // Fallback to raw data URL if canvas context unavailable
          resolve(event.target?.result as string);
          return;
        }

        // Draw image with smooth scaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, width, height);

        // Try outputting target mimeType; fallback to jpeg if unsupported
        try {
          const dataUrl = canvas.toDataURL(mimeType, quality);
          if (dataUrl.startsWith(`data:${mimeType}`)) {
            resolve(dataUrl);
            return;
          }
        } catch {}

        resolve(canvas.toDataURL("image/jpeg", quality));
      };

      img.src = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  });
}

/**
 * Uploads an image file or Data URL to Supabase Storage.
 * Falls back gracefully to compressed Data URL if Storage bucket is not available.
 */
export async function uploadToSupabaseStorage(
  fileOrDataUrl: File | string,
  options: { bucket?: string; folder?: string; pageId?: string } = {},
): Promise<string> {
  const { supabase } = await import("@/integrations/supabase/client");
  const bucket = options.bucket || "template-assets";
  const folder = options.folder || "uploads";

  let compressedDataUrl = typeof fileOrDataUrl === "string" ? fileOrDataUrl : "";

  if (typeof fileOrDataUrl !== "string") {
    compressedDataUrl = await compressImage(fileOrDataUrl);
  }

  try {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;

    if (!userId) {
      return compressedDataUrl;
    }

    // Convert data URL to Blob
    const res = await fetch(compressedDataUrl);
    const blob = await res.blob();
    const filename = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.webp`;

    const uploadRes = await supabase.storage.from(bucket).upload(filename, blob, {
      contentType: "image/webp",
      upsert: true,
    });

    if (uploadRes.data?.path) {
      const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(uploadRes.data.path);
      const publicUrl = publicUrlData?.publicUrl || compressedDataUrl;

      // Register asset record in public.storage_objects metadata table
      try {
        await supabase.from("storage_objects").insert({
          user_id: userId,
          page_id: options.pageId || null,
          bucket_name: bucket,
          file_path: uploadRes.data.path,
          mime_type: "image/webp",
          size_bytes: blob.size,
        } as any);
      } catch {}

      return publicUrl;
    }
  } catch (err) {
    console.warn("[Supabase Storage] Fallback to data URL:", err);
  }

  return compressedDataUrl;
}
