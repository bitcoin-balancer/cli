import { writeTextFile } from 'fs-utils-sync';
import { getEnvironmentVariableInsights } from '../shared/utils/index.js';
import { IComposeFileConfig } from './types.js';
import { canGenerateComposeFile } from './validations.js';
import {
  generatePOSTGRESService,
  generateAPIService,
  generateGUIService,
  generateCLOUDFLAREDService,
  generateSecrets,
  generateVolumes,
} from './templates.js';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Generates the compose.yaml file based on a configuration and the .env file in the host.
 * @param config
 * @throws
 * - if the .env file doesn't exist or cannot be loaded for any reason
 * - if no secrets are found in the directory
 * - if testMode and restoreMode are both enabled simultaneously
 * - if NODE_ENV is set to 'production' and testMode is enabled
 * - if NODE_ENV is set to 'development' and restoreMode is enabled
 * - if the cloudflared token is set but NODE_ENV is set to 'development'
 */
const generate = ({
  testMode = false,
  restoreMode = false,
}: Partial<IComposeFileConfig> = {}): void => {
  // extract the insights
  const { isProduction, hasCloudflaredToken, secrets } = getEnvironmentVariableInsights();

  // validate the request
  canGenerateComposeFile(isProduction, hasCloudflaredToken, testMode, restoreMode);

  // header
  let _ = 'name: balancer\n\n';
  _ += 'services:\n\n';

  // services
  _ += generatePOSTGRESService();
  _ += '\n\n\n';

  _ += generateAPIService(testMode, restoreMode);
  _ += testMode ? '\n\n\n\n\n' : '\n\n\n';

  if (!testMode && !restoreMode) {
    _ += generateGUIService();
    _ += hasCloudflaredToken ? '\n\n\n' : '\n\n\n\n\n';
  }

  if (hasCloudflaredToken) {
    _ += generateCLOUDFLAREDService();
    _ += '\n\n\n\n\n';
  }

  // volumes
  _ += generateVolumes();
  _ += '\n\n\n\n\n';

  // secrets
  _ += generateSecrets(secrets);

  // finally, save the file
  writeTextFile('compose.yaml', _);
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // utils
  getEnvironmentVariableInsights,

  // implementation
  generate,
};
