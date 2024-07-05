import { writeTextFile } from 'fs-utils-sync';
import { IComposeFileConfig } from './types.js';

/* ************************************************************************************************
 *                                           CONSTANTS                                            *
 ************************************************************************************************ */

// the path of the file that will be generated
const FILE_PATH = 'compose.yaml';


/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

const generate = ({
  testMode = false,
  restoreMode = false,
}: IComposeFileConfig = {}): void => {
  let _ = 'name: balancer';
  _+= '\n\n\n\n\n';

  // finally, save the file
  writeTextFile(FILE_PATH, _);
};




/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  generate,
};
