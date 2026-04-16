import { put, del, list } from "@vercel/blob";

// Folders mapped to each page section
export const BLOB_FOLDERS = {
  banners:      "banners",
  bio:          "bio",
  contact:      "contact",
  disc:         "disc",
  live:         "live",
  music:        "music",
  news:         "news",
  photos:       "photos",
  posters:      "posters",
  shop:         "shop",
  tour:         "tour",
  videos:       "videos",
  admin:        "admin",
};

/**
 * Upload a file to the Vercel Blob store under a section folder.
 * @param {string} folder - One of the BLOB_FOLDERS values.
 * @param {string} filename - Destination filename (e.g. "cover.jpg").
 * @param {File|Blob|Buffer|ReadableStream} data - File content.
 * @param {{ contentType?: string, addRandomSuffix?: boolean }} [options]
 * @returns {Promise<import("@vercel/blob").PutBlobResult>}
 */
export async function uploadToBlob(folder, filename, data, options = {}) {
  const pathname = `${folder}/${filename}`;
  return put(pathname, data, {
    access: "public",
    addRandomSuffix: options.addRandomSuffix ?? false,
    contentType: options.contentType,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
}

/**
 * Delete a file from the Vercel Blob store by its URL.
 * @param {string} url - The public URL returned by uploadToBlob.
 * @returns {Promise<void>}
 */
export async function deleteFromBlob(url) {
  return del(url, { token: process.env.BLOB_READ_WRITE_TOKEN });
}

/**
 * List all files in a section folder.
 * @param {string} folder - One of the BLOB_FOLDERS values.
 * @returns {Promise<import("@vercel/blob").ListBlobResult>}
 */
export async function listBlobFiles(folder) {
  return list({
    prefix: `${folder}/`,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
}
