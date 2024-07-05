
/* ************************************************************************************************
 *                                             TYPES                                              *
 ************************************************************************************************ */

/**
 * Compose File Config
 * The config that will be used to generate the compose.yaml file.
 */
type IComposeFileConfig = {
  // the mode in which the services will run
  testMode: boolean;
  restoreMode: boolean;
};

type IEnvironmentVariableInsights = {
  // true if NODE_ENV === 'production'
  isProduction: boolean;

  // true if TUNNEL_TOKEN === '/run/secrets/TUNNEL_TOKEN'
  hasCloudflaredToken: boolean;
};




/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export type {
  IComposeFileConfig,
  IEnvironmentVariableInsights,
};
