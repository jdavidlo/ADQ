import assert from 'node:assert/strict';
import test from 'node:test';
import { getChromeState, getScrollDirection } from '../src/scripts/scroll-state.js';

test('detects upward scrolling after a small movement threshold', () => {
  assert.equal(getScrollDirection(120, 100), 'up');
});

test('detects downward scrolling after a small movement threshold', () => {
  assert.equal(getScrollDirection(100, 120), 'down');
});

test('ignores tiny movements to prevent chrome jitter', () => {
  assert.equal(getScrollDirection(100, 102), 'idle');
});

test('shows the header and expands the dock while scrolling up', () => {
  assert.deepEqual(getChromeState('up'), { headerVisible: true, dockCompact: false });
});

test('hides the header and compacts the dock while scrolling down', () => {
  assert.deepEqual(getChromeState('down'), { headerVisible: false, dockCompact: true });
});

test('leaves the current chrome state unchanged for idle movement', () => {
  assert.equal(getChromeState('idle'), null);
});
