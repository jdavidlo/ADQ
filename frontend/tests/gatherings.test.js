import test from 'node:test';
import assert from 'node:assert/strict';
import { getGatherings, getGoogleMapsUrl } from '../src/services/gatherings.js';

test('provides Sunday services and the additional weekly meetings', () => {
  const gatherings = getGatherings();
  assert.deepEqual(gatherings.sunday.meetings, [
    { name: 'Primera reunión', time: '10:30 a. m.' },
    { name: 'Segunda reunión', time: '12:30 p. m.' },
  ]);
  assert.equal(gatherings.additional.length, 4);
  assert.deepEqual(gatherings.additional.map(({ day, name, time }) => [day, name, time]), [
    ['Lunes', 'Oración', '8:00 p. m.'],
    ['Jueves', 'Mujeres', '9:00 a. m.'],
    ['Viernes', 'Jóvenes', '8:00 p. m.'],
    ['Sábado', 'Hombres', '8:00 a. m.'],
  ]);
});

test('creates a Google Maps search URL from an address and leaves missing locations unset', () => {
  assert.equal(getGoogleMapsUrl({ address: 'Calle Uno 123, México' }), 'https://www.google.com/maps/search/?api=1&query=Calle%20Uno%20123%2C%20M%C3%A9xico');
  assert.equal(getGoogleMapsUrl({ address: null, googleMapsUrl: null }), null);
});

test('provides sample location and contact defaults', () => {
  const gatherings = getGatherings();
  assert.equal(gatherings.isSample, true);
  assert.equal(gatherings.location.address, 'Calle Ejemplo 123, Colonia Ejemplo, C. P. 00000, Estado de México, México');
  assert.equal(gatherings.location.isSample, true);
  assert.equal(gatherings.location.googleMapsUrl, null);
  assert.ok(decodeURIComponent(getGoogleMapsUrl()).includes(gatherings.location.address));
  assert.ok(gatherings.contact.phone);
  assert.ok(gatherings.contact.email.endsWith('@example.org'));
  assert.equal(getGoogleMapsUrl(), getGoogleMapsUrl(gatherings.location));
});

test('preserves a supplied Google Maps link', () => {
  const link = 'https://maps.app.goo.gl/example';
  assert.equal(getGoogleMapsUrl({ address: null, googleMapsUrl: link }), link);
});
