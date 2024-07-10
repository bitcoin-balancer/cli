import { describe, afterEach, test, expect, vi } from 'vitest';
import { readTextFile, getDirectoryElements } from 'fs-utils-sync';
import { decodeMenuAction, getEnvironmentVariableInsights } from './index.js';

/* ************************************************************************************************
 *                                             MOCKS                                              *
 ************************************************************************************************ */

// mocks the entire fs-utils-sync module
vi.mock('fs-utils-sync', () => ({
  readTextFile: vi.fn(),
  getDirectoryElements: vi.fn(),
}));





/* ************************************************************************************************
 *                                            HELPERS                                             *
 ************************************************************************************************ */

// mocks the contents returned by the readTextFile func
const mockReadTextFile = (env: string) => {
  // @ts-ignore
  readTextFile.mockReturnValue(env);
};

// mocks the contents returned by the getDirectoryElements func
const mockGetDirectoryElements = (files: string[]) => {
  // @ts-ignore
  getDirectoryElements.mockReturnValue({
    files: files.map((file) => ({ baseName: file })),
    directories: [],
  });
};





/* ************************************************************************************************
 *                                             TESTS                                              *
 ************************************************************************************************ */

describe('decodeMenuAction', () => {
  test.each([
    ['', { id: '', variation: undefined }],
    ['build', { id: 'build', variation: undefined }],
    ['build-up', { id: 'build-up', variation: undefined }],
    ['build-up:test-mode', { id: 'build-up', variation: 'test-mode' }],
    ['build-up:restore-mode', { id: 'build-up', variation: 'restore-mode' }],
  ])('decodeMenuAction(%s) -> %o', (a, expected) => {
    expect(decodeMenuAction(a)).toEqual(expected);
  });
});





describe('getEnvironmentVariableInsights', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('can put together the insights for a development .env file', () => {
    mockReadTextFile('NODE_ENV=development\nTUNNEL_TOKEN=');
    mockGetDirectoryElements(['POSTGRES_PASSWORD_FILE.txt', 'ROOT_ACCOUNT.txt']);
    expect(getEnvironmentVariableInsights()).toStrictEqual({
      isProduction: false,
      hasCloudflaredToken: false,
      secrets: ['POSTGRES_PASSWORD_FILE', 'ROOT_ACCOUNT'],
    });
    expect(readTextFile).toHaveBeenCalledOnce();
    expect(getDirectoryElements).toHaveBeenCalledOnce();
  });

  test('can put together the insights for a production .env file', () => {
    mockReadTextFile('NODE_ENV=production\nTUNNEL_TOKEN=');
    mockGetDirectoryElements(['POSTGRES_PASSWORD_FILE.txt', 'ROOT_ACCOUNT.txt', 'TELEGRAM.txt']);
    expect(getEnvironmentVariableInsights()).toStrictEqual({
      isProduction: true,
      hasCloudflaredToken: false,
      secrets: ['POSTGRES_PASSWORD_FILE', 'ROOT_ACCOUNT', 'TELEGRAM'],
    });
    expect(readTextFile).toHaveBeenCalledOnce();
    expect(getDirectoryElements).toHaveBeenCalledOnce();
  });

  test('can put together the insights for a production .env file w/ cloudflared token', () => {
    mockReadTextFile('NODE_ENV=production\nTUNNEL_TOKEN=/run/secrets/TUNNEL_TOKEN');
    mockGetDirectoryElements(['POSTGRES_PASSWORD_FILE.txt', 'ROOT_ACCOUNT.txt', 'TELEGRAM.txt', 'TUNNEL_TOKEN.txt']);
    expect(getEnvironmentVariableInsights()).toStrictEqual({
      isProduction: true,
      hasCloudflaredToken: true,
      secrets: ['POSTGRES_PASSWORD_FILE', 'ROOT_ACCOUNT', 'TELEGRAM', 'TUNNEL_TOKEN'],
    });
    expect(readTextFile).toHaveBeenCalledOnce();
    expect(getDirectoryElements).toHaveBeenCalledOnce();
  });
});
