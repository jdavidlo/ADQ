import assert from 'node:assert/strict';
import test from 'node:test';
import { getDailyVerse, getHomeContent } from '../src/services/daily-verse.js';

const verses = [
  { reference: 'Salmo 23:1', text: 'Jehová es mi pastor.' },
  { reference: 'Salmo 121:2', text: 'Mi socorro viene de Jehová.' },
];

test('returns the same verse for two times on the same calendar day', () => {
  const morning = getDailyVerse(verses, new Date(2026, 0, 1, 8));
  const evening = getDailyVerse(verses, new Date(2026, 0, 1, 20));

  assert.deepEqual(morning, evening);
});

test('rotates to another verse on the next calendar day', () => {
  const firstDay = getDailyVerse(verses, new Date(2026, 0, 1, 23));
  const nextDay = getDailyVerse(verses, new Date(2026, 0, 2, 1));

  assert.notDeepEqual(firstDay, nextDay);
});

test('returns the configured NVI verse for daily-verse mode', () => {
  const content = getHomeContent({
    mode: 'daily-verse',
    translation: 'NVI',
    verses: [{ reference: 'Salmo 23:1', text: 'El Señor es mi pastor, nada me falta.' }],
    liveSermon: { outlineUrl: null },
  }, new Date(2026, 0, 1));

  assert.equal(content.type, 'daily-verse');
  assert.equal(content.verse.translation, 'NVI');
  assert.equal(content.verse.reference, 'Salmo 23:1');
});

test('returns the sermon view model in live-sermon mode', () => {
  const content = getHomeContent({
    mode: 'live-sermon',
    translation: 'NVI',
    verses: [{ reference: 'Salmo 23:1', text: 'El Señor es mi pastor, nada me falta.' }],
    liveSermon: { outlineUrl: 'https://docs.google.com/document/d/sample/view', isLive: true, preacher: 'Pastor Alberto' },
  });

  assert.equal(content.type, 'live-sermon');
  assert.equal(content.outlineUrl, 'https://docs.google.com/document/d/sample/view');
  assert.equal(content.sermon.preacher, 'Pastor Alberto');
  assert.equal(content.sermon.isLive, true);
  assert.equal(content.sermon.title, null);
});

test('uses NVI in the configured home verse mode', () => {
  const verse = getDailyVerse(undefined, new Date(2026, 0, 1));
  assert.equal(verse.translation, 'NVI');
});

test('rejects an empty verse collection', () => {
  assert.throws(() => getDailyVerse([], new Date(2026, 0, 1)), /at least one verse/i);
});

test('rejects unsupported home content modes', () => {
  assert.throws(() => getHomeContent({ mode: 'unknown' }), /unsupported home content mode/i);
});
