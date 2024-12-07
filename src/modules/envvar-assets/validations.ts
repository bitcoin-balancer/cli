import { normalize } from 'path';
import { isStringValid } from 'web-utils-kit';
import { isFile, isDirectory, getDirectoryElements } from 'fs-utils-sync';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Verifies if an envar assets source file is located at a path.
 * @param srcPath
 * @returns boolean | string
 */
const isSrcPathValid = (srcPath: string): boolean | string => {
  if (
    isStringValid(srcPath)
    && /.json$/.test(srcPath)
    && isFile(srcPath)
  ) {
    return true;
  }
  return `The path '${srcPath}' is not a valid source file.`;
};

/**
 * Verifies if the envvar assets can be placed in a path (directory).
 * @param destPath
 * @returns boolean | string
 */
const isDestPathValid = (destPath: string): boolean | string => {
  if (
    isStringValid(destPath, 1)
    && isDirectory(destPath)
  ) {
    const { files, directories } = getDirectoryElements(destPath);
    return files.length === 0 && directories.length === 0
      ? true
      : 'The destination path must be an empty directory. The one provided contains elements.';
  }
  return `The path '${destPath}' is not a valid destination. Make sure it is an empty directory.`;
};

/**
 * Verifies if a path contains all the environment variable assets in order to be deployed to the
 * remote host.
 * @param srcPath
 * @returns boolean | string
 */
const isSrcPathValidForDeployment = (srcPath: string): boolean | string => {
  if (
    isStringValid(srcPath, 1)
    && isDirectory(srcPath)
    && isFile(normalize(`${srcPath}/.env`))
    && isDirectory(normalize(`${srcPath}/secrets`))
  ) {
    const { files } = getDirectoryElements(`${srcPath}/secrets`);
    return files.length > 0
      ? true
      : `The secrets directory '${srcPath}/secrets' is empty.`;
  }
  return `The path '${srcPath}' is invalid. It must contain the .env file and the secrets directory.`;
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  isSrcPathValid,
  isDestPathValid,
  isSrcPathValidForDeployment,
};
