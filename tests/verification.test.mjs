import { test } from 'node:test';
import assert from 'node:assert/strict';
import handler, { contacts, requireVerified } from '../netlify/functions/enquiry.ts';

test('normalizes Indian phone numbers and email', () => {
  assert.deepEqual(contacts(' Example@Example.com ', '70659 08203'), { email: 'example@example.com', phone: '+917065908203' });
  assert.equal(contacts('example@example.com', '+44 7700 900123').phone, '+447700900123');
});
test('rejects malformed contact data', () => {
  for (const pair of [[null, null], ['bad', '7065908203'], ['x@y.z', '0000000000'], ['x@y.z', '+123']]) assert.throws(() => contacts(...pair));
});
test('rejects cross-origin requests and refuses delivery when not configured', async () => {
  globalThis.Netlify = { env: { get: key => ({ NEXT_PUBLIC_SITE_URL: 'https://diwanshuk-web.netlify.app' })[key] } };
  const context = { ip: '127.0.0.1' };
  assert.equal((await handler(new Request('https://diwanshuk-web.netlify.app/api/enquiry', { method: 'GET' }), context)).status, 405);
  assert.equal((await handler(new Request('https://diwanshuk-web.netlify.app/api/enquiry', { method: 'POST', headers: { origin: 'https://attacker.example' } }), context)).status, 403);
  const response = await handler(new Request('https://diwanshuk-web.netlify.app/api/enquiry', { method: 'POST', headers: { origin: 'https://diwanshuk-web.netlify.app' }, body: JSON.stringify({ action: 'submit', emailVerified: true, smsVerified: true }) }), context);
  assert.equal(response.status, 503);
});

test('requires both verified contacts, rejects changes, expiry and replay', () => {
  const session = { email: 'x@y.z', phone: '+917065908203', expires: 1000, emailVerified: true, smsVerified: true, emailAttempts: 0, smsAttempts: 0 };
  assert.doesNotThrow(() => requireVerified(session, session.email, session.phone, 500));
  for (const changes of [{emailVerified:false}, {smsVerified:false}, {expires:499}, {submitted:true}]) assert.throws(() => requireVerified({...session,...changes}, session.email, session.phone, 500));
  assert.throws(() => requireVerified(session, 'other@y.z', session.phone, 500));
  assert.throws(() => requireVerified(session, session.email, '+917065908204', 500));
});
