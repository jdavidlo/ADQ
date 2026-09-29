import test from 'node:test';
import assert from 'node:assert/strict';
import { getSmallGroups } from '../src/services/small-groups.js';
import { getSmallGroupsSheetState } from '../src/scripts/small-groups-sheet.js';

test('provides the Grupos Pequeños page and accessible image text', () => {
  const page = getSmallGroups();
  assert.equal(page.pageUrl, 'https://grupospequenos.adq.mx/');
  assert.equal(page.title, 'Grupos pequeños');
  assert.ok(page.imageAlt.length > 0);
});

test('always opens the groups sheet fully and closes it directly', () => {
  assert.equal(getSmallGroupsSheetState('closed', 'open'), 'full');
  assert.equal(getSmallGroupsSheetState('half', 'open'), 'full');
  assert.equal(getSmallGroupsSheetState('full', 'close'), 'closed');
  assert.equal(getSmallGroupsSheetState('closed', 'close'), 'closed');
});
