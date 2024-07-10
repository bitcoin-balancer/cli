import { basename } from 'node:path';
import { readJSONFile, getDirectoryElements, readTextFile } from 'fs-utils-sync';
import {
  PackageFileSchema,
  IPackageFile,
  IRemoteHostConfig,
  RemoteHostConfigSchema,
  IEnvironmentVariableInsights,
  IDecodedMenuAction,
} from './types.js';

/* ************************************************************************************************
 *                                           FS HELPERS                                           *
 ************************************************************************************************ */

/**
 * Retrieves the contents from the package.json file.
 * @returns IPackageFile
 * @throws
 * - if the file's schema is invalid or the file doesn't exist
 */
const readPackageFile = (): IPackageFile => PackageFileSchema.parse(readJSONFile('package.json'));

/**
 * Retrieves the contents from the remoet-host.config.json file.
 * @returns IRemoteHostConfig
 * @throws
 * - if the file's schema is invalid or the file doesn't exist
 */
const readRemoteHostConfigFile = (): IRemoteHostConfig => (
  RemoteHostConfigSchema.parse(readJSONFile('remote-host.config.json'))
);

/**
 * Retrieves the list of secrets located in the secrets directory.
 * @returns string[]
 * @throws
 * - if no secrets are found in the directory
 */
const getSecrets = (): string[] => {
  const { files } = getDirectoryElements('secrets', { includeExts: ['.txt'] });
  if (!files.length) {
    throw new Error('The secrets directory does not contain any secret files.');
  }
  return files.map((file) => basename(file.baseName, '.txt'));
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
    hasTunnelToken: file.includes('TUNNEL_TOKEN=/run/secrets/TUNNEL_TOKEN'),
    secrets: getSecrets(),
  };
};





/* ************************************************************************************************
 *                                         ACTION HELPERS                                         *
 ************************************************************************************************ */

/**
 * Decodes a chosen menu action by splitting it into an id and variation. For example:
 * - decodeMenuAction('up') -> { id: 'up' }
 * - decodeMenuAction('up:test-mode') -> { id: 'up', variation: 'test-mode' }
 * @param action
 * @returns IDecodedMenuAction
 */
const decodeMenuAction = (action: string): IDecodedMenuAction => {
  if (action.includes(':')) {
    const split = action.split(':');
    return { id: split[0], variation: split[1] };
  }
  return { id: action };
};

/**
 * Merges a list of payloads into a single string.
 * @param payloads
 * @returns string
 */
const mergePayloads = (payloads: (string | undefined)[]): string => {
  if (payloads.length) {
    return <string>payloads.reduce(
      (previous, current) => {
        if (typeof current === 'string' && current.length) {
          return `${previous}\n${current}`;
        }
        return previous;
      },
      '',
    );
  }
  return '';
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // types
  // ...

  // fs helpers
  readPackageFile,
  readRemoteHostConfigFile,
  getSecrets,
  getEnvironmentVariableInsights,

  // actions helpers
  decodeMenuAction,
  mergePayloads,
};
