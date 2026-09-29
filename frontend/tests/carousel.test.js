import test from 'node:test';
import assert from 'node:assert/strict';
import { getNextCarouselIndex } from '../src/scripts/carousel.js';

test('moves to the next carousel slide and wraps to the first', () => {
  assert.equal(getNextCarouselIndex(0, 3, 1), 1);
  assert.equal(getNextCarouselIndex(2, 3, 1), 0);
});

test('moves to the previous carousel slide and wraps to the last', () => {
  assert.equal(getNextCarouselIndex(0, 3, -1), 2);
  assert.equal(getNextCarouselIndex(2, 3, -1), 1);
});
