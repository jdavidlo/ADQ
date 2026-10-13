import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { getPrayerAnnouncement } from '../src/services/prayer-announcement.js';

test('provides the weekly Monday prayer announcement and a replaceable image slot', () => {
  assert.deepEqual(getPrayerAnnouncement(), {
    title: 'Lunes de oración',
    schedule: 'Todos los lunes · 8:00 p. m.',
    image: null,
    imageAlt: 'Espacio reservado para una imagen de reunión de oración',
  });
});

test('renders the announcement as a non-interactive card without navigation or modal', async () => {
  const component = await readFile(new URL('../src/components/PrayerAnnouncementCard.astro', import.meta.url), 'utf8');

  assert.match(component, /\{announcement\.title\}/);
  assert.match(component, /\{announcement\.schedule\}/);
  assert.match(component, /role="img"/);
  assert.doesNotMatch(component, /<a\b|<button\b|role="dialog"|aria-haspopup/);
});
