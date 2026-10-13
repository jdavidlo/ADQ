import test from 'node:test';
import assert from 'node:assert/strict';
import { getCarouselSwipeDirection, bindCarouselGestures } from '../src/scripts/carousel-gestures.js';

test('left advances and right goes back without capturing vertical scrolling', () => {
  assert.equal(getCarouselSwipeDirection(-80, 5), 1);
  assert.equal(getCarouselSwipeDirection(80, 5), -1);
  assert.equal(getCarouselSwipeDirection(20, 5), 0);
  assert.equal(getCarouselSwipeDirection(50, 90), 0);
});
test('touch gestures trigger exactly one carousel change', () => {
  const listeners = new Map();
  const changes = [];
  bindCarouselGestures({ addEventListener: (name, cb) => listeners.set(name, cb) }, d => changes.push(d));
  listeners.get('touchstart')({ touches: [{ clientX: 150, clientY: 50 }] });
  listeners.get('touchmove')({ touches: [{ clientX: 70, clientY: 55 }], cancelable: true, preventDefault() {} });
  listeners.get('touchend')();
  assert.deepEqual(changes, [1]);
});
