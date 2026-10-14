import current from '../../../data/information/current.json' with { type: 'json' };
import { getGatherings, getGoogleMapsUrl } from './gatherings.js';

// Replace the local response through this adapter when the API is available.
export function getInformation(data = current, gatherings = getGatherings()) {
  const location = gatherings.location && !gatherings.location.isSample
    ? { ...gatherings.location, mapUrl: getGoogleMapsUrl(gatherings.location) } : null;
  const contact = gatherings.contact && !gatherings.contact.isSample
    ? gatherings.contact : null;
  const whatsapp = data.whatsapp;
  const whatsappUrl = whatsapp?.confirmed === true && whatsapp.isSample === false
    && typeof whatsapp.number === 'string' && /^[1-9]\d{7,14}$/.test(whatsapp.number)
    ? `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(whatsapp.message ?? '')}` : null;
  return { ...data, sunday: gatherings.sunday, additional: gatherings.additional, location, contact, whatsappUrl };
}
