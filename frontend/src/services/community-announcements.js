import announcements from '../../../data/home/community-announcements.json' with { type: 'json' };
import gatherings from '../../../data/home/gatherings.json' with { type: 'json' };

export function getCommunityAnnouncement(group) {
  if (group !== 'women' && group !== 'men') throw new Error(`Unknown community group: ${group}`);
  const announcement = announcements[group];
  const meeting = gatherings.additional.find(item => item.name === announcement.meetingName);
  if (!meeting) throw new Error(`Missing meeting schedule: ${announcement.meetingName}`);
  return { ...announcement, day: meeting.day, time: meeting.time };
}

export function getCollegeAnnouncement(settings = announcements.college) {
  const whatsappEnabled = settings.whatsappConfirmed === true && /^\d{10,15}$/.test(settings.whatsappNumber ?? '');
  const contactUrl = whatsappEnabled
    ? `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(settings.message)}`
    : settings.websiteUrl;
  return {
    ...settings,
    contactLabel: 'Solicitar información',
    contactUrl,
  };
}
