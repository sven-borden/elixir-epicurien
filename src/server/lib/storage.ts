/**
 * Storage helpers for managing cocktail images in Vercel Blob Storage
 *
 * This module provides functions to upload and delete images from cloud storage,
 * replacing the previous approach of storing base64 images in the database.
 */

import { put, del } from "@vercel/blob";
import crypto from "crypto";

/**
 * Uploads an image buffer to Vercel Blob Storage
 *
 * @param buffer - The image buffer to upload (WebP format recommended)
 * @param cocktailId - The unique ID of the cocktail (used for naming)
 * @returns Promise<string> - The public URL of the uploaded image
 *
 * @example
 * const url = await uploadImage(webpBuffer, "clxyz123");
 * // Returns: "https://blob.vercel-storage.com/cocktails/clxyz123-abc123.webp"
 */
export async function uploadImage(
  buffer: Buffer,
  cocktailId: string,
): Promise<string> {
  // Generate a unique filename with timestamp to prevent caching issues
  const timestamp = Date.now();
  const hash = crypto.randomBytes(8).toString("hex");
  const filename = `cocktails/${cocktailId}-${timestamp}-${hash}.webp`;

  try {
    const blob = await put(filename, buffer, {
      access: "public",
      contentType: "image/webp",
      addRandomSuffix: false, // We're handling uniqueness ourselves
    });

    return blob.url;
  } catch (error) {
    console.error("Failed to upload image to blob storage:", error);
    throw new Error("Failed to upload image to cloud storage");
  }
}

/**
 * Deletes an image from Vercel Blob Storage
 *
 * @param url - The full URL of the image to delete
 * @returns Promise<void>
 *
 * @example
 * await deleteImage("https://blob.vercel-storage.com/cocktails/clxyz123-abc123.webp");
 */
export async function deleteImage(url: string): Promise<void> {
  try {
    await del(url);
  } catch (error) {
    // Log but don't throw - deletion failures shouldn't break the app
    console.error("Failed to delete image from blob storage:", error);
  }
}

/**
 * Converts a PNG buffer to WebP format for smaller file sizes
 *
 * @param pngBuffer - The PNG image buffer
 * @param quality - WebP quality (0-100, default 75)
 * @returns Promise<Buffer> - The converted WebP buffer
 */
export async function convertPngToWebp(
  pngBuffer: Buffer,
  quality = 75,
): Promise<Buffer> {
  const sharp = (await import("sharp")).default;

  return await sharp(pngBuffer)
    .webp({
      quality: quality,
      alphaQuality: quality,
      lossless: false,
      effort: 2,
    })
    .toBuffer();
}
