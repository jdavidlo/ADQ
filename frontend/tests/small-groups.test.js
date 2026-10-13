import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { getSmallGroups } from '../src/services/small-groups.js';
import { getSmallGroupsSheetState } from '../src/scripts/small-groups-sheet.js';

test('provides the Grupos Pequeños page and accessible image text', () => {
  const page = getSmallGroups();
  assert.equal(page.pageUrl, 'https://grupospequenos.adq.mx/');
  assert.equal(page.title, 'Grupos pequeños');
  assert.ok(page.imageAlt.length > 0);
});

test('keeps vertical scrolling available in the embedded page and shows the full card image', async () => {
  const component = await readFile(new URL('../src/components/SmallGroupsCard.astro', import.meta.url), 'utf8');
  const styles = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');

  assert.match(component, /scrolling="yes"/);
  assert.match(styles, /\.small-groups-sheet-frame\s*\{[^}]*overflow:\s*auto[^}]*touch-action:\s*pan-y/);
  assert.match(styles, /\.small-groups-card-image\s*\{[^}]*object-fit:\s*contain/);
  assert.doesNotMatch(styles, /\.small-groups-card::after/);
});

test('always opens the groups sheet fully and closes it directly', () => {
  assert.equal(getSmallGroupsSheetState('closed', 'open'), 'full');
  assert.equal(getSmallGroupsSheetState('half', 'open'), 'full');
  assert.equal(getSmallGroupsSheetState('full', 'close'), 'closed');
  assert.equal(getSmallGroupsSheetState('full', 'collapse'), 'closed');
  assert.equal(getSmallGroupsSheetState('closed', 'close'), 'closed');
});
