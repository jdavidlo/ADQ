import test from 'node:test';
import assert from 'node:assert/strict';
import { getPastorSheetState } from '../src/scripts/pastor-sheet.js';

test('opens the pastor sheet at its half-height state', () => {
  assert.equal(getPastorSheetState('closed', 'open'), 'half');
});

test('expands and collapses between the half and near-full states', () => {
  assert.equal(getPastorSheetState('half', 'expand'), 'full');
  assert.equal(getPastorSheetState('full', 'collapse'), 'half');
});

test('closes the sheet from either height', () => {
  assert.equal(getPastorSheetState('half', 'close'), 'closed');
  assert.equal(getPastorSheetState('full', 'close'), 'closed');
});
