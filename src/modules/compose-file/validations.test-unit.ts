import { describe, test, expect } from 'vitest';
import { canGenerateComposeFile } from './validations.js';

/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */
describe('canGenerateComposeFile', () => {
  test('does not throw an error for a basic development setup', () => {
    expect(canGenerateComposeFile(false, false, false, false)).toBeUndefined();
  });

  test('does not throw an error for a development setup w/ TEST_MODE', () => {
    expect(canGenerateComposeFile(false, false, true, false)).toBeUndefined();
  });

  test('does not throw an error for a basic production setup', () => {
    expect(canGenerateComposeFile(true, false, false, false)).toBeUndefined();
  });

  test('does not throw an error for a production setup w/ cloudflared token', () => {
    expect(canGenerateComposeFile(true, true, false, false)).toBeUndefined();
  });

  test('does not throw an error for a production setup w/ RESTORE_MODE', () => {
    expect(canGenerateComposeFile(true, false, false, true)).toBeUndefined();
  });

  test('does not throw an error for a production setup w/ cloudflared token & RESTORE_MODE', () => {
    expect(canGenerateComposeFile(true, true, false, true)).toBeUndefined();
  });

  test('throws when TEST_MODE & RESTORE_MODE are both enabled', () => {
    expect(() => canGenerateComposeFile(false, false, true, true)).toThrowError('The compose.yaml file cannot be generated because TEST_MODE and RESTORE_MODE cannot be enabled at the same time.');
  });

  test('throws when TEST_MODE is enabled when running in production', () => {
    expect(() => canGenerateComposeFile(true, false, true, false)).toThrowError('The compose.yaml file cannot be generated because TEST_MODE cannot be enabled when running in production.');
  });

  test('throws when the cloudflared token is provided in development', () => {
    expect(() => canGenerateComposeFile(false, true, false, false)).toThrowError('The compose.yaml file cannot be generated because Cloudflare\'s TUNNEL_TOKEN can only be provided when running in production.');
  });
});
