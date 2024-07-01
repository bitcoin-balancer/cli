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
    typeof srcPath === 'string'
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
    typeof destPath === 'string'
    && destPath.length
    && isDirectory(destPath)
  ) {
    const { files, directories } = getDirectoryElements(destPath);
    return files.length === 0 && directories.length === 0
      ? true
      : 'The destination path must be an empty directory. The one provided contains elements.';
  }
  return `The path '${destPath}' is not a valid destination. Make sure it is an empty directory.`;
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  isSrcPathValid,
  isDestPathValid,
};
