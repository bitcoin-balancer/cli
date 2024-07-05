import { describe, beforeAll, afterAll, beforeEach, afterEach, test, expect, vi } from 'vitest';
import { readTextFile } from 'fs-utils-sync';
import { getEnvironmentVariableInsights } from './utils.js';

/* ************************************************************************************************
 *                                             MOCKS                                              *
 ************************************************************************************************ */

// mocks the entire fs-utils-sync module
vi.mock('fs-utils-sync', () => ({
  readTextFile: vi.fn(),
}));





/* ************************************************************************************************
 *                                            HELPERS                                             *
 ************************************************************************************************ */

// mocks the contents returned by the readTextFile func
const mockReadTextFile = (env: string) => {
  // @ts-ignore
  readTextFile.mockReturnValue(env);
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
    expect(getEnvironmentVariableInsights()).toStrictEqual({
      isProduction: false,
      hasCloudflaredToken: false,
    });
    expect(readTextFile).toHaveBeenCalledOnce();
  });

  test('can put together the insights for a production .env file', () => {
    mockReadTextFile('NODE_ENV=production\nTUNNEL_TOKEN=');
    expect(getEnvironmentVariableInsights()).toStrictEqual({
      isProduction: true,
      hasCloudflaredToken: false,
    });
    expect(readTextFile).toHaveBeenCalledOnce();
  });

  test('can put together the insights for a production .env file w/ cloudflared token', () => {
    mockReadTextFile('NODE_ENV=production\nTUNNEL_TOKEN=/run/secrets/TUNNEL_TOKEN');
    expect(getEnvironmentVariableInsights()).toStrictEqual({
      isProduction: true,
      hasCloudflaredToken: true,
    });
    expect(readTextFile).toHaveBeenCalledOnce();
  });
});
