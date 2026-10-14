import current from '../../../data/live/current.json' with { type: 'json' };
import catalog from '../../../data/catalogs/live-states.json' with { type: 'json' };

export function getLiveStates() {
  return catalog.states;
}

function safePlatformUrl(value, hosts) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && hosts.includes(url.hostname) ? url.href : null;
  } catch { return null; }
}

// Accept the future Go response through this same adapter; the default is a local mock.
export function getLiveContent(data = current) {
  const state = catalog.states.find(item => item.value === data.status)
    ?? catalog.states.find(item => item.value === 'unknown');
  const videoId = typeof data.video?.id === 'string' && /^[A-Za-z0-9_-]{11}$/.test(data.video.id)
    ? data.video.id : null;
  return {
    status: state.value,
    provider: data.provider ?? 'youtube',
    checkedAt: data.checkedAt ?? null,
    video: { id: videoId, title: data.video?.title?.trim() || null },
    links: {
      youtube: safePlatformUrl(data.links?.youtube, ['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be']),
      facebook: safePlatformUrl(data.links?.facebook, ['facebook.com', 'www.facebook.com', 'm.facebook.com', 'fb.watch']),
    },
    broadcastSchedule: data.broadcastSchedule ?? { timezone: 'America/Mexico_City', meetings: [] },
    statusLabel: state.label,
    isLive: state.isLive,
    showSchedule: state.showSchedule,
    dockColor: state.dockColor,
    dockPulse: state.dockPulse,
    youtubeEmbedUrl: state.showPlayer && videoId
      ? `https://www.youtube.com/embed/${videoId}?playsinline=1` : null,
  };
}
