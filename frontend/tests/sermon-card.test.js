import test from 'node:test';
import assert from 'node:assert/strict';
import { getSermonCard } from '../src/services/sermon-card.js';
import { getHomeContentModes } from '../src/services/home-content-modes.js';

test('preview flags cover live and available messages with or without title', () => {
  for (const { value: preview } of getHomeContentModes().sermonPreviews.filter(item => item.value !== null)) {
    const card = getSermonCard({ preview, preacher: 'Pastor Alberto', title: 'Una fe que permanece', outlineUrl: null });
    assert.equal(card.isLive, preview.startsWith('live'));
    assert.equal(Boolean(card.title), preview.endsWith('title'));
    assert.equal(card.preacher, 'Pastor Alberto');
    assert.equal(card.isPreview, true);
    assert.equal(card.outlineUrl, null);
  }
});

test('API-shaped data needs no title and only enables safe document links', () => {
  const card = getSermonCard({ isLive: false, preacher: 'Pastor Alberto', title: ' ', outlineUrl: 'https://docs.google.com/document/d/sample/view' });
  assert.equal(card.title, null);
  assert.equal(card.isPreview, false);
  assert.equal(card.statusLabel, 'Mensaje disponible');
  assert.equal(card.outlineUrl, 'https://docs.google.com/document/d/sample/view');
  assert.equal(getSermonCard({ isLive: true, outlineUrl: 'javascript:alert(1)' }).outlineUrl, null);
  assert.equal(getSermonCard({ isLive: false, outlineUrl: null }).statusLabel, 'Mensaje');
});
