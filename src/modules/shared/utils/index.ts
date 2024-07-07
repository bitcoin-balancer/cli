import { readJSONFile } from 'fs-utils-sync';
import {
  PackageFileSchema,
  IPackageFile,
  IDecodedMenuAction,
  IRemoteHostConfig,
  RemoteHostConfigSchema,
} from '../types.js';

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
  // fs helpers
  readPackageFile,
  readRemoteHostConfigFile,

  // actions helpers
  decodeMenuAction,
  mergePayloads,
};
