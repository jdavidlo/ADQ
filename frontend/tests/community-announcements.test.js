import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { getCommunityAnnouncement, getCollegeAnnouncement } from '../src/services/community-announcements.js';

test('reuses the meeting schedules and supplies separate editorial/invitation copy', () => {
  const women = getCommunityAnnouncement('women');
  const men = getCommunityAnnouncement('men');
  assert.equal(women.day, 'Jueves');
  assert.equal(women.time, '9:00 a. m.');
  assert.equal(men.day, 'Sábado');
  assert.equal(men.time, '8:00 a. m.');
  assert.equal(women.image, null);
  assert.equal(men.image, null);
  assert.throws(() => getCommunityAnnouncement('unknown'), /Unknown/);
});

test('college uses its official website until WhatsApp and admissions are confirmed', () => {
  const college = getCollegeAnnouncement();
  assert.equal(college.name, 'Colegio Renaissance');
  assert.equal(college.websiteUrl, 'https://colegiorenaissance.com/');
  assert.equal(college.contactUrl, college.websiteUrl);
  assert.equal(college.whatsappNumber, null);
  assert.equal(college.headline, undefined);
  assert.equal(college.contactLabel, 'Solicitar información');
});

test('confirmed college contact generates a WhatsApp link; unconfirmed numbers never do', () => {
  const websiteUrl = 'https://colegiorenaissance.com/';
  const settings = { websiteUrl, whatsappNumber: '524421958247', whatsappConfirmed: false, admissionsOpen: true, message: 'Hola, quisiera información sobre inscripciones.' };
  assert.equal(getCollegeAnnouncement(settings).contactUrl, websiteUrl);
  const confirmed = getCollegeAnnouncement({ ...settings, whatsappConfirmed: true });
  assert.equal(confirmed.headline, undefined);
  assert.equal(confirmed.contactLabel, 'Solicitar información');
  const url = new URL(confirmed.contactUrl);
  assert.equal(url.host, 'wa.me');
  assert.equal(url.pathname, '/524421958247');
  assert.equal(url.searchParams.get('text'), settings.message);
  assert.equal(getCollegeAnnouncement({ ...settings, whatsappConfirmed: true, whatsappNumber: 'invalid' }).contactUrl, websiteUrl);
});

test('women and men have distinct layouts without navigation or new modals', async () => {
  for (const [name, layout] of [['WomenAnnouncementCard', 'women-editorial'], ['MenAnnouncementCard', 'men-invitation']]) {
    const component = await readFile(new URL(`../src/components/${name}.astro`, import.meta.url), 'utf8');
    assert.match(component, new RegExp(layout));
    if (name === 'WomenAnnouncementCard') assert.match(component, /loading="lazy"/);
    assert.doesNotMatch(component, /<button\b|<a\b|role="dialog"|<script/);
  }
  const college = await readFile(new URL('../src/components/CollegeAnnouncementCard.astro', import.meta.url), 'utf8');
  assert.match(college, /href=\{college.contactUrl\}/);
  assert.match(college, /\{college.name\}/);
  assert.match(college, /&gt;/);
  assert.doesNotMatch(college, /college.headline|Conoce el colegio|↗/);
  assert.doesNotMatch(college, /role="dialog"|<script/);
});
