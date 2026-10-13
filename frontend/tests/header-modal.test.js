import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';
import { getScrollDirection, getChromeState } from '../src/scripts/scroll-state.js';

test('updates scroll direction without an undefined menu callback', async () => {
  const page = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
  assert.ok(!page.includes('closeMenu()'), 'undefined callback must not interrupt updating previousY');
  assert.ok(page.includes('getScrollDirection(previousY, currentY, 0)'), 'react on any upward movement');
});

test('live homepage scroll handler shows header after a one-pixel upward reversal far from the top', async () => {
  const page = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
  const handler = page.slice(page.indexOf('      const updateChrome ='), page.indexOf("      window.addEventListener('scroll'"));
  const classes = new Set();
  const classList = { remove: name => classes.delete(name), toggle: (name, enabled) => enabled ? classes.add(name) : classes.delete(name) };
  const context = { window: { scrollY: 600 }, header: { classList }, dock: { classList }, getScrollDirection, getChromeState };
  runInNewContext('let previousY=0;let scrollFrame=0;' + handler + 'updateChrome(); window.scrollY=599; updateChrome();', context);
  assert.equal(classes.has('is-hidden'), false);
});


test('modal backdrop fills viewport without forcing the hidden header visible', async () => {
  const css = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');
  const shared = css.slice(css.indexOf('/* Shared mobile-first sheet sizing'));
  assert.ok(!shared.includes('.site-header.is-hidden'), 'preserve existing header state');
  assert.ok(/\.small-groups-sheet-layer\s*\{\s*inset:\s*0;/.test(shared), 'backdrop must fill screen');
  assert.ok(shared.includes('height: calc(100dvh - var(--modal-top-gap, 82px))'), 'only white sheet height is bounded');
});
