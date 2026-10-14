import test from 'node:test';
import assert from 'node:assert/strict';
import { getLiveContent, getLiveStates } from '../src/services/live.js';

test('mock has an API-shaped offline response with no invented sources or schedules', () => {
  const content = getLiveContent();
  assert.equal(content.status, 'offline');
  assert.equal(content.isLive, false);
  assert.equal(content.youtubeEmbedUrl, null);
  assert.deepEqual(content.links, { youtube: 'https://www.youtube.com/@AmistadDeQueretaro/streams', facebook: 'https://www.facebook.com/AmistadDeQueretaroAc' });
  assert.deepEqual(content.broadcastSchedule.meetings, []);
  assert.equal(content.broadcastSchedule.timezone, 'America/Mexico_City');
});

test('catalog drives live state, player visibility and dock pulse', () => {
  assert.deepEqual(getLiveStates().map(state => state.value), ['live', 'offline', 'unknown']);
  for (const state of getLiveStates()) {
    const content = getLiveContent({ status: state.value, video: { id: 'AAAAAAAAAAA', title: null } });
    assert.equal(content.isLive, state.value === 'live');
    assert.equal(content.dockPulse, state.dockPulse);
    assert.equal(Boolean(content.youtubeEmbedUrl), state.value === 'live');
    assert.equal(content.statusLabel, state.label);
  }
});

test('unknown status is not offline and unsafe URLs or invalid IDs never become embeds', () => {
  const unknown = getLiveContent({ status: 'unexpected', video: { id: 'AAAAAAAAAAA' } });
  assert.equal(unknown.status, 'unknown');
  assert.equal(unknown.statusLabel, 'No pudimos consultar la transmisión');
  const live = getLiveContent({ status: 'live', video: { id: '<invalid>' }, links: { youtube: 'javascript:alert(1)', facebook: 'https://example.org/' } });
  assert.equal(live.youtubeEmbedUrl, null);
  assert.deepEqual(live.links, { youtube: null, facebook: null });
  const valid = getLiveContent({ status: 'live', video: { id: 'AAAAAAAAAAA' }, links: { youtube: 'https://www.youtube.com/watch?v=AAAAAAAAAAA', facebook: 'https://www.facebook.com/example' } });
  assert.equal(valid.youtubeEmbedUrl, 'https://www.youtube.com/embed/AAAAAAAAAAA?playsinline=1');
  assert.equal(valid.links.facebook, 'https://www.facebook.com/example');
});
