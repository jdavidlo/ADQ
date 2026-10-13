import test from 'node:test';
import assert from 'node:assert/strict';
import { getPastorSheetState } from '../src/scripts/pastor-sheet.js';

test('always opens shared sheets expanded, regardless of their previous height', () => {
  assert.equal(getPastorSheetState('closed', 'open'), 'full');
  assert.equal(getPastorSheetState('half', 'open'), 'full');
});

test('expands and collapses between the half and near-full states', () => {
  assert.equal(getPastorSheetState('half', 'expand'), 'full');
  assert.equal(getPastorSheetState('full', 'collapse'), 'half');
});

test('closes the sheet from either height', () => {
  assert.equal(getPastorSheetState('half', 'close'), 'closed');
  assert.equal(getPastorSheetState('full', 'close'), 'closed');
});
