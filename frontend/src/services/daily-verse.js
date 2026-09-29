import dailyVerseData from '../../../data/scripture/daily-verses.json' with { type: 'json' };

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
  if (data.mode === 'live-sermon') {
    return { type: 'live-sermon', outlineUrl: data.liveSermon?.outlineUrl ?? null };
  }

  if (data.mode !== 'daily-verse') {
    throw new RangeError(`Unsupported home content mode: ${data.mode}`);
  }

  return {
    type: 'daily-verse',
    verse: getDailyVerse(data.verses, date, data.translation),
  };
}
