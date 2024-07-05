
import { readTextFile } from 'fs-utils-sync';
import { IEnvironmentVariableInsights } from './types.js';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Extracts the .env file's insights so the compose.yaml file can be built.
 * @returns IEnvironmentVariableInsights
 * @throws
 * - if the .env file doesn't exist or cannot be loaded for any reason
 */
const getEnvironmentVariableInsights = (): IEnvironmentVariableInsights => {
  const file = readTextFile('.env');
  return {
    isProduction: file.includes('NODE_ENV=production'),
    hasCloudflaredToken: file.includes('TUNNEL_TOKEN=/run/secrets/TUNNEL_TOKEN'),
  };
};



/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  getEnvironmentVariableInsights,
};
