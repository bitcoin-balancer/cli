import { writeTextFile } from 'fs-utils-sync';
import { IComposeFileConfig } from './types.js';
import { getEnvironmentVariableInsights } from './utils.js';
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
 * Generates the compose.yaml file based on a configuration.
 * @param config
 * @throws
 * - if testMode and restoreMode are both enabled simultaneously
 * - if the .env file doesn't exist or cannot be loaded for any reason
 * - if NODE_ENV is set to 'production' and testMode is enabled
 * - if NODE_ENV is set to 'development' and restoreMode is enabled
 * - if the cloudflared token is set but NODE_ENV is set to 'development'
 */
const generate = ({
  testMode = false,
  restoreMode = false,
}: Partial<IComposeFileConfig> = {}): void => {
  // extract the insights
  const { isProduction, hasCloudflaredToken } = getEnvironmentVariableInsights();

  // validate the request
  canGenerateComposeFile(isProduction, hasCloudflaredToken, testMode, restoreMode);

  // header
  let _ = 'name: balancer';
  _ += '\n\n\n\n\n';

  // services
  _ += generatePOSTGRESService();
  _ += '\n\n';

  _ += generateAPIService(testMode, restoreMode);
  _ += '\n\n';

  if (!testMode && !restoreMode) {
    _ += generateGUIService();
    if (hasCloudflaredToken) {
      _ += '\n\n';
    }
  }

  if (hasCloudflaredToken) {
    _ += generateCLOUDFLAREDService();
  }
  _ += '\n\n\n\n\n';

  // volumes
  _ += generateVolumes();
  _ += '\n\n\n\n\n';

  // secrets
  _ += generateSecrets();

  // finally, save the file
  writeTextFile('compose.yaml', _);
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  generate,
};
