import { describe, beforeAll, afterAll, beforeEach, afterEach, test, expect, vi } from 'vitest';
import { readTextFile, getDirectoryElements } from 'fs-utils-sync';
import { getEnvironmentVariableInsights } from './utils.js';

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

describe('getEnvironmentVariableInsights', () => {
  beforeAll(() => { });

  afterAll(() => { });

  beforeEach(() => { });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('can put together the insights for a development .env file', () => {
    mockReadTextFile('NODE_ENV=development\nTUNNEL_TOKEN=');
    mockGetDirectoryElements(['POSTGRES_PASSWORD_FILE', 'ROOT_ACCOUNT']);
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
    mockGetDirectoryElements(['POSTGRES_PASSWORD_FILE', 'ROOT_ACCOUNT', 'TELEGRAM']);
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
    mockGetDirectoryElements(['POSTGRES_PASSWORD_FILE', 'ROOT_ACCOUNT', 'TELEGRAM', 'TUNNEL_TOKEN']);
    expect(getEnvironmentVariableInsights()).toStrictEqual({
      isProduction: true,
      hasCloudflaredToken: true,
      secrets: ['POSTGRES_PASSWORD_FILE', 'ROOT_ACCOUNT', 'TELEGRAM', 'TUNNEL_TOKEN'],
    });
    expect(readTextFile).toHaveBeenCalledOnce();
    expect(getDirectoryElements).toHaveBeenCalledOnce();
  });
});
