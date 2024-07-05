
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

/**
 * Environment Variable Insights
 * General data regarding the environment variable assets that are needed to build the compose file.
 */
type IEnvironmentVariableInsights = {
  // true if NODE_ENV === 'production'
  isProduction: boolean;

  // true if TUNNEL_TOKEN === '/run/secrets/TUNNEL_TOKEN'
  hasCloudflaredToken: boolean;

  // the list of secrets located in the 'secrets' directory
  secrets: string[];
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export type {
  IComposeFileConfig,
  IEnvironmentVariableInsights,
};
