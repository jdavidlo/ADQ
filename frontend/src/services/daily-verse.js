import dailyVerseData from '../../../data/scripture/daily-verses.json' with { type: 'json' };

import { getSermonCard } from './sermon-card.js';
import { getHomeContentMode } from './home-content-modes.js';

const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

export function getDayOfYear(date) {
  const currentDay = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const firstDay = Date.UTC(date.getFullYear(), 0, 1);
  return Math.floor((currentDay - firstDay) / DAY_IN_MILLISECONDS);
}

export function getDailyVerse(
  verses = dailyVerseData.verses,
  date = new Date(),
  translation = dailyVerseData.translation,
) {
  if (!verses.length) {
    throw new RangeError('The daily verse collection must contain at least one verse.');
  }

  const index = getDayOfYear(date) % verses.length;
  return { ...verses[index], translation };
}

export function getHomeContent(data = dailyVerseData, date = new Date()) {
  const mode = getHomeContentMode(data.mode);
  if (mode.type === 'live-sermon') {
    const sermon = getSermonCard(data.liveSermon);
    return { type: 'live-sermon', outlineUrl: sermon.outlineUrl, sermon };
  }

  return {
    type: 'daily-verse',
    verse: getDailyVerse(data.verses, date, data.translation),
  };
}
