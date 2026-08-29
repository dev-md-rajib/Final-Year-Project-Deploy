/**
 * Helper to resolve static/uploaded image URLs.
 * Handles full URLs (http/https/data/blob) as well as relative paths (/uploads/...).
 */
export function getMediaUrl(url) {
  if (!url) return '';
  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('data:') ||
    url.startsWith('blob:')
  ) {
    return url;
  }

  const rawBase = import.meta.env.VITE_API_BASE_URL || '';
  const cleanBase = rawBase.replace(/\/+$/, '').replace(/\/api$/, '');
  const cleanPath = url.startsWith('/') ? url : `/${url}`;

  return cleanBase ? `${cleanBase}${cleanPath}` : cleanPath;
}

export default getMediaUrl;
