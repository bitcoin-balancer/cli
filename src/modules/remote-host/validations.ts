import { isDirectory } from 'fs-utils-sync';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Verifies if a destination path on the local host is valid.
 * @param destPath
 * @returns boolean | string
 */
const isDatabaseBackupDestPathValid = (destPath: string): boolean | string => (
  isDirectory(destPath) ? true : `The path '${destPath}' is not a valid directory.`
);





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  isDatabaseBackupDestPathValid,
};
