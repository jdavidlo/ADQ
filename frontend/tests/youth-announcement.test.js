import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { getYouthAnnouncement } from '../src/services/youth-announcement.js';

test('provides Friday youth meeting details and replaceable image slides', () => {
  const announcement = getYouthAnnouncement();
  assert.equal(announcement.title, 'Grupo de jóvenes');
  assert.equal(announcement.day, 'Todos los viernes');
  assert.equal(announcement.time, '8:00 p. m.');
  assert.equal(announcement.images.length, 3);
  assert.ok(announcement.images.every(({ src, alt }) => src === null && alt.length > 0));
});

test('renders an instant-photo carousel without navigation or a modal', async () => {
  const component = await readFile(new URL('../src/components/YouthAnnouncementCard.astro', import.meta.url), 'utf8');

  assert.match(component, /class="youth-polaroid-card"/);
  assert.match(component, /class="youth-polaroid-title"/);
  assert.match(component, /class="youth-polaroid-photo"/);
  assert.match(component, /class="youth-polaroid-footer"/);
  assert.match(component, /data-youth-dot/);
  assert.match(component, /prefers-reduced-motion/);
  assert.doesNotMatch(component, /<a\b|role="dialog"|aria-haspopup/);
});

test('uses a complete horizontal photo and places the signature and schedule in white frame areas', async () => {
  const styles = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');

  assert.match(styles, /\.small-groups-card-image\s*\{[^}]*aspect-ratio:\s*1920\s*\/\s*955/);
  assert.match(styles, /\.youth-polaroid-photo\s*\{[^}]*aspect-ratio:\s*1920\s*\/\s*955/);
  assert.match(styles, /\.youth-carousel-image\s*\{[^}]*object-fit:\s*contain/);
  assert.match(styles, /\.youth-polaroid-title\s*\{[^}]*font-family:[^}]*cursive/);
  assert.match(styles, /\.youth-polaroid-footer\s*\{[^}]*background:\s*#fff/);
});

test('aligns weekday left, pagination center, and meeting time right in the lower frame', async () => {
  const component = await readFile(new URL('../src/components/YouthAnnouncementCard.astro', import.meta.url), 'utf8');
  const styles = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');
  const dayIndex = component.indexOf('class="youth-polaroid-day"');
  const dotsIndex = component.indexOf('class="youth-carousel-pagination"');
  const timeIndex = component.indexOf('class="youth-polaroid-time"');

  assert.ok(dayIndex >= 0 && dayIndex < dotsIndex && dotsIndex < timeIndex);
  assert.match(styles, /\.youth-polaroid-footer\s*\{[^}]*display:\s*grid[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s+auto\s+minmax\(0,\s*1fr\)/);
  assert.match(styles, /\.youth-polaroid-day\s*\{[^}]*justify-self:\s*start/);
  assert.match(styles, /\.youth-polaroid-time\s*\{[^}]*justify-self:\s*end/);
});

test('uses the same typography for the day and hour labels', async () => {
  const styles = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');
  const sharedRule = styles.match(/\.youth-polaroid-day,\s*\.youth-polaroid-time\s*\{([^}]*)\}/)?.[1];

  assert.ok(sharedRule, 'day and time share a typography rule');
  assert.match(sharedRule, /color:\s*#34483a/);
  assert.match(sharedRule, /font-size:\s*clamp\(/);
  assert.match(sharedRule, /font-weight:\s*700/);
});
