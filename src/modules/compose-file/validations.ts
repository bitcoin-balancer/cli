

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Verifies if a compose.yaml file can be generated with the provided configuration.
 * @param isProduction
 * @param hasCloudflaredToken
 * @param testMode
 * @param restoreMode
 * @throws
 * - if testMode and restoreMode are both enabled simultaneously
 * - if NODE_ENV is set to 'production' and testMode is enabled
 * - if NODE_ENV is set to 'development' and restoreMode is enabled
 * - if the cloudflared token is set but NODE_ENV is set to 'development'
 */
const canGenerateComposeFile = (
  isProduction: boolean,
  hasCloudflaredToken: boolean,
  testMode: boolean,
  restoreMode: boolean,
): void => {
  // ensure both modes aren't enabled at the same time
  if (testMode && restoreMode) {
    throw new Error('The compose.yaml file cannot be generated because TEST_MODE and RESTORE_MODE cannot be enabled at the same time.');
  }

  // ensure testMode is not enabled during a production execution
  if (isProduction && testMode) {
    throw new Error('The compose.yaml file cannot be generated because TEST_MODE cannot be enabled when running in production.');
  }

  // ensure restoreMode only runs in production
  if (!isProduction && restoreMode) {
    throw new Error('The compose.yaml file cannot be generated because RESTORE_MODE can only be enabled when running in production.');
  }

  // ensure the cloudflared token is only provided in production
  if (!isProduction && hasCloudflaredToken) {
    throw new Error('The compose.yaml file cannot be generated because Cloudflare\'s TUNNEL_TOKEN can only be provided when running in production.');
  }
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  canGenerateComposeFile,
};
