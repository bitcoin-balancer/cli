import { readJSONFile } from 'fs-utils-sync';
import { PackageFileSchema, IPackageFile, IDecodedMenuAction } from './types.js';

/* ************************************************************************************************
 *                                           FS HELPERS                                           *
 ************************************************************************************************ */


/**
 * Retrieves the contents from the package.json file.
 * @returns IPackageFile
 */
const readPackageFile = (): IPackageFile => PackageFileSchema.parse(readJSONFile('package.json'));





/* ************************************************************************************************
 *                                         ACTION HELPERS                                         *
 ************************************************************************************************ */

/**
 * Decodes a chosen menu action by splitting it into an id and variation. For example:
 * decodeMenuAction('up') -> { id: 'up', variation: '' }
 * decodeMenuAction('up:test-mode') -> { id: 'up', variation: 'test-mode' }
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



/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // fs helpers
  readPackageFile,

  // actions helpers
  decodeMenuAction,
};
