import { getSermonPreview } from './home-content-modes.js';

export function getSermonCard(data = {}) {
  const preview = getSermonPreview(data.preview ?? null);
  let outlineUrl = null;
  try {
    const url = new URL(data.outlineUrl);
    if (url.protocol === 'https:' && ['drive.google.com', 'docs.google.com'].includes(url.hostname)) outlineUrl = url.href;
  } catch { /* Missing or invalid links remain inactive. */ }
  const isLive = preview ? preview.isLive : data.isLive === true;
  const title = preview?.showTitle === false ? null : data.title?.trim() || null;
  return {
    isLive,
    isPreview: Boolean(preview),
    preacher: data.preacher?.trim() || null,
    title,
    outlineUrl,
    statusLabel: isLive ? 'En vivo' : outlineUrl || preview ? 'Mensaje disponible' : 'Mensaje',
  };
}
