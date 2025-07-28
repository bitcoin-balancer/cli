import { isDirectory, isFile } from 'fs-utils-sync';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Verifies if a destination path on the local host is a valid directory.
 * @param destPath
 * @returns boolean | string
 */
const isDatabaseBackupDestPathValid = (destPath: string): boolean | string =>
  isDirectory(destPath) ? true : `The path '${destPath}' is not a valid directory.`;

/**
 * Verifies if a source path is a valid database backup file.
 * @param srcPath
 * @returns boolean | string
 */
const isDatabaseBackupSrcPathValid = (srcPath: string): boolean | string =>
  isFile(srcPath) && /^.+.dump$/.test(srcPath)
    ? true
    : `The path '${srcPath}' is not a valid backup file`;

/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export { isDatabaseBackupDestPathValid, isDatabaseBackupSrcPathValid };
