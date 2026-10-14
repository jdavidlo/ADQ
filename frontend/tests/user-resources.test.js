import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('Usuario is a dedicated social resource page with an uncropped weekly image and accessible service areas', async () => {
  const page = await readFile(new URL('../src/pages/usuario.astro', import.meta.url), 'utf8');
  const dock = await readFile(new URL('../src/components/BottomDock.astro', import.meta.url), 'utf8');
  const css = await readFile(new URL('../src/styles/user-resources.css', import.meta.url), 'utf8');
  assert.match(page, /<BottomDock active="usuario"/);
  assert.match(page, /<img/);
  assert.match(page, /data.weeklyPlan.image.src/);
  assert.match(page, /<details/);
  assert.match(page, /<summary/);
  assert.match(page, /resource.url/);
  assert.match(page, /<SiteBehavior/);
  assert.doesNotMatch(page, /↗|↙/);
  assert.match(page, /<ArrowIcon/);
  assert.match(css, /object-fit: contain/);
  assert.match(dock, /id: 'usuario'.*href: '\/usuario\/'/);
});

test('User resources expose the five requested areas and no invented reading image', async () => {
  const { getUserResources } = await import('../src/services/user-resources.js');
  const data = getUserResources();
  assert.deepEqual(data.areas.map(area => area.name), ['Multimedia', 'Edecanes', 'Alabanza', 'Limpieza', 'Transmisión']);
  assert.equal(data.weeklyPlan.image.src, null);
  assert.ok(data.areas.every(area => area.resources.length === 0));
  const response = getUserResources({ ...data, weeklyPlan: { ...data.weeklyPlan, image: { src: 'javascript:alert(1)', alt: 'Plan' } }, areas: [{ id: 'test', name: 'Test', resources: [{ title: 'Invalid', url: '//external.test/file' }, { title: 'Valid', url: '/resources/test.pdf' }] }] });
  assert.equal(response.weeklyPlan.image.src, null);
  assert.deepEqual(response.areas[0].resources.map(item => item.url), ['/resources/test.pdf']);
});
