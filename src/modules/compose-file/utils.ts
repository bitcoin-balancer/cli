
import { readTextFile, getDirectoryElements } from 'fs-utils-sync';
import { IEnvironmentVariableInsights } from './types.js';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Retrieves the list of secrets located in the secrets directory.
 * @returns string[]
 * @throws
 * - if no secrets are found in the directory
 */
const __getSecrets = (): string[] => {
  const { files } = getDirectoryElements('secrets', { includeExts: ['.txt'] });
  if (!files.length) {
    throw new Error('The secrets directory does not contain any secret files.');
  }
  return files.map((file) => file.baseName);
};

/**
 * Extracts the .env file's insights so the compose.yaml file can be built.
 * @returns IEnvironmentVariableInsights
 * @throws
 * - if the .env file doesn't exist or cannot be loaded for any reason
 * - if no secrets are found in the directory
 */
const getEnvironmentVariableInsights = (): IEnvironmentVariableInsights => {
  const file = readTextFile('.env');
  return {
    isProduction: file.includes('NODE_ENV=production'),
    hasCloudflaredToken: file.includes('TUNNEL_TOKEN=/run/secrets/TUNNEL_TOKEN'),
    secrets: __getSecrets(),
  };
};



/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  getEnvironmentVariableInsights,
};
