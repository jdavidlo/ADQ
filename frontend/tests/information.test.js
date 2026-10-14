import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('Information reuses meeting schedules but never publishes sample contact or location', async () => {
  const { getInformation } = await import('../src/services/information.js');
  const { getGatherings } = await import('../src/services/gatherings.js');
  const info = getInformation();
  assert.deepEqual(info.sunday, getGatherings().sunday);
  assert.deepEqual(info.additional, getGatherings().additional);
  assert.equal(info.location, null);
  assert.equal(info.contact, null);
  assert.ok(info.faqs.length > 0);
  assert.ok(info.faqs.every(item => item.question && item.answer));
  assert.equal(info.whatsappUrl, null);
  const whatsapp = { number: '524420000000', confirmed: true, isSample: true, message: 'Hola, quiero visitar Amistad.' };
  assert.equal(getInformation({ ...info, whatsapp }).whatsappUrl, null);
  assert.equal(getInformation({ ...info, whatsapp: { ...whatsapp, confirmed: false, isSample: false } }).whatsappUrl, null);
  assert.equal(getInformation({ ...info, whatsapp: { ...whatsapp, number: 'bad', isSample: false } }).whatsappUrl, null);
  assert.equal(getInformation({ ...info, whatsapp: { ...whatsapp, isSample: false } }).whatsappUrl,
    'https://wa.me/524420000000?text=' + encodeURIComponent(whatsapp.message));
});

test('Information is an editorial page with visible answers and one contact', async () => {
  const page = await readFile(new URL('../src/pages/informacion.astro', import.meta.url), 'utf8');
  const dock = await readFile(new URL('../src/components/BottomDock.astro', import.meta.url), 'utf8');
  assert.match(dock, /id: 'informacion'.*href: '\/informacion\/'/);
  assert.match(page, /<title>Visítanos y conoce Amistad de Querétaro<\/title>/);
  assert.match(page, /name="description"/);
  assert.match(page, /<BottomDock active="informacion"/);
  assert.doesNotMatch(page, /<details|<summary>|item.href|info.visit.href/);
  assert.match(page, /<dl class="information-questions"/);
  assert.match(page, /info.whatsappUrl/);
  assert.match(page, /disabled/);
  assert.match(page, /item.answer/);
  assert.match(page, /<SiteBehavior/);
  assert.doesNotMatch(page, /info.additional.map/);
  assert.doesNotMatch(page, /pendiente de confirmación|pendientes de confirmación/);
  const { getInformation } = await import('../src/services/information.js');
  const info = getInformation();
  assert.ok(info.heading.length < 40);
  assert.ok(info.intro.split(/\s+/).length <= 20);
  assert.ok(info.faqs.every(item => item.answer.split(/\s+/).length <= 25));
  const css = await readFile(new URL('../src/styles/information.css', import.meta.url), 'utf8');
  assert.doesNotMatch(css, /text-underline-offset/);
  assert.match(css, /\.information-main a \{ text-decoration: none;/);
  assert.match(info.intro, /Cristo/);
  assert.match(info.visit.title, /domingo/i);
  assert.ok(info.faqs.every(item => !item.href));
  assert.doesNotMatch(JSON.stringify(info), /youtube|youtu\.be/i);
});
