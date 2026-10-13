import test from 'node:test';
import assert from 'node:assert/strict';
import { getSheetGestureAction, bindSheetGestures } from '../src/scripts/sheet-gestures.js';

test('upward swipe expands a half sheet from anywhere', () => {
  assert.equal(getSheetGestureAction('half', -70, 0, 120), 'expand');
});
test('downward swipe collapses a full sheet and closes a half sheet at scroll start', () => {
  assert.equal(getSheetGestureAction('full', 70, 0, 0), 'collapse');
  assert.equal(getSheetGestureAction('half', 70, 0, 0), 'close');
});
test('preserves content scrolling, horizontal swipes and small movements', () => {
  assert.equal(getSheetGestureAction('full', 70, 0, 100), null);
  assert.equal(getSheetGestureAction('full', -70, 0, 0), null);
  assert.equal(getSheetGestureAction('half', 20, 0, 0), null);
  assert.equal(getSheetGestureAction('half', -70, 100, 0), null);
  assert.equal(getSheetGestureAction('closed', 70, 0, 0), null);
});

test('content touch events resize once and prevent accidental clicks after a swipe', () => {
  const listeners = new Map();
  const sheet = { addEventListener: (name, callback) => listeners.set(name, callback) };
  const actions = [];
  let prevented = false;
  bindSheetGestures(sheet, () => 'half', (action) => actions.push(action));
  const target = { closest: () => ({ scrollTop: 0 }) };
  listeners.get('touchstart')({ touches: [{ clientX: 20, clientY: 200 }], target });
  listeners.get('touchmove')({ touches: [{ clientX: 20, clientY: 130 }], cancelable: true, preventDefault: () => { prevented = true; } });
  assert.equal(prevented, true);
  listeners.get('touchend')();
  assert.deepEqual(actions, ['expand']);
  let clickStopped = false;
  listeners.get('click')({ preventDefault() {}, stopImmediatePropagation: () => { clickStopped = true; } });
  assert.equal(clickStopped, true);
});

test('mouse drag from scrolled content still collapses and completes outside the sheet', () => {
  const local = new Map(), global = new Map(), actions = [];
  const sheet = { addEventListener: (n, cb) => local.set(n, cb), ownerDocument: { querySelector: () => null, addEventListener: (n, cb) => global.set(n, cb) } };
  const target = { closest: selector => selector.includes('sheet-content') ? { scrollTop: 150 } : null };
  bindSheetGestures(sheet, () => 'full', action => actions.push(action));
  let selectionPrevented = false;
  local.get('pointerdown')({ pointerType: 'mouse', button: 0, clientX: 100, clientY: 200, target, cancelable: true, preventDefault: () => { selectionPrevented = true; } });
  assert.equal(selectionPrevented, true);
  assert.ok(global.has('pointermove') && global.has('pointerup'), 'track outside the sheet');
  global.get('pointermove')({ pointerType: 'mouse', buttons: 1, clientX: 100, clientY: 280, cancelable: true, preventDefault() {} });
  global.get('pointerup')({ pointerType: 'mouse' });
  assert.deepEqual(actions, ['collapse']);
});


