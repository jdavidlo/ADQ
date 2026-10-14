import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('Live is a dedicated page with player, external alternatives and general church schedules', async () => {
  const page = await readFile(new URL('../src/pages/live.astro', import.meta.url), 'utf8');
  const screen = await readFile(new URL('../src/components/LiveScreen.astro', import.meta.url), 'utf8');
  const dock = await readFile(new URL('../src/components/BottomDock.astro', import.meta.url), 'utf8');
  assert.match(page, /getLiveContent\(\)/);
  assert.match(page, /<LiveScreen live=\{live\}/);
  assert.match(page, /<BottomDock active="live" live=\{live\}/);
  assert.match(screen, /live.youtubeEmbedUrl/);
  assert.match(screen, /Horarios de Amistad/);
  assert.match(screen, /getGatherings\(\)/);
  assert.match(screen, /Abrir en YouTube/);
  assert.match(screen, /Ver en Facebook/);
  assert.match(dock, /href: '\/live\/'/);
  assert.match(dock, /live.dockPulse/);
});
