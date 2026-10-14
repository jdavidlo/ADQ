import current from '../../../data/user/resources.json' with { type: 'json' };

function safeResourceUrl(value) {
  if (typeof value !== 'string' || /[\\\x00-\x20]/.test(value)) return null;
  if (value.startsWith('/') && !value.startsWith('//')) return value;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : null;
  } catch { return null; }
}

// Local API-shaped snapshot; replace through this adapter when connected.
export function getUserResources(data = current) {
  return {
    ...data,
    weeklyPlan: {
      ...data.weeklyPlan,
      image: { ...data.weeklyPlan?.image, src: safeResourceUrl(data.weeklyPlan?.image?.src) },
    },
    areas: (data.areas ?? []).map(area => ({
      ...area,
      resources: (area.resources ?? []).map(resource => ({ ...resource, url: safeResourceUrl(resource.url) }))
        .filter(resource => resource.url),
    })),
  };
}
