import gatherings from '../../../data/home/gatherings.json' with { type: 'json' };

export function getGatherings() {
  return gatherings;
}

export function getGoogleMapsUrl(location = gatherings.location) {
  if (location?.googleMapsUrl) return location.googleMapsUrl;
  if (!location?.address) return null;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`;
}
