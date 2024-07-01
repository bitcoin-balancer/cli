import { readSourceFile } from './utils.js';
import { isSrcPathValid, isDestPathValid } from './validations.js';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

const generate = (srcPath: string, destPath: string): void => {
  // read the source file
  const source = readSourceFile(srcPath);
  console.log(source);
};




/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // validations
  isSrcPathValid,
  isDestPathValid,

  // implementation
  generate,
};
