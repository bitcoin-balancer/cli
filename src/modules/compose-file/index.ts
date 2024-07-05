import { writeTextFile } from 'fs-utils-sync';
import { IComposeFileConfig } from './types.js';
import { generateSecrets, generateVolumes } from './templates.js';

/* ************************************************************************************************
 *                                           CONSTANTS                                            *
 ************************************************************************************************ */

// the path of the file that will be generated
const FILE_PATH = 'compose.yaml';





/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Generates the compose.yaml file based on a configuration.
 * @param config
 * @throws
 * - if testMode and restoreMode are both enabled simultaneously
 * - if the .env file doesn't exist or cannot be loaded for any reason
 * - if NODE_ENV is set to 'production' and testMode is enabled
 * - if NODE_ENV is set to 'development' and restoreMode is enabled
 */
const generate = ({
  testMode = false,
  restoreMode = false,
}: Partial<IComposeFileConfig> = {}): void => {
  // header
  let _ = 'name: balancer';
  _ += '\n\n\n\n\n';

  // services

  _ += '\n\n\n\n\n';

  // volumes
  _ += generateVolumes();
  _ += '\n\n\n\n\n';

  // secrets
  _ += generateSecrets();

  // finally, save the file
  writeTextFile(FILE_PATH, _);
};




/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  generate,
};
