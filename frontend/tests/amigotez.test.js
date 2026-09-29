import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { getAmigotez } from '../src/services/amigotez.js';

test('provides Amigo Tez mission, visit story, and in-kind donation options', () => {
  const amigotez = getAmigotez();
  assert.equal(amigotez.name, 'Amigo Tez');
  assert.match(amigotez.cardSummary, /niñez queretana/);
  assert.match(amigotez.visitStory, /25 niñas/);
  assert.deepEqual(amigotez.inKindDonations, ['Ropa', 'Juguetes']);
  assert.match(amigotez.donationDelivery, /presencialmente en la iglesia/);
});

test('centers the team invitation and omits removed modal copy', async () => {
  const component = await readFile(new URL('../src/components/AmigotezCard.astro', import.meta.url), 'utf8');
  const styles = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');

  assert.match(styles, /\.amigotez-join-action\s*\{[^}]*justify-items:\s*center/);
  assert.doesNotMatch(component, /El contacto de WhatsApp se agregará cuando esté confirmado/);
  assert.doesNotMatch(component, /Familias al servicio de la niñez queretana/);
});

test('keeps the WhatsApp call to action inactive until a real contact is supplied', () => {
  assert.equal(getAmigotez().joinUrl, null);
});
