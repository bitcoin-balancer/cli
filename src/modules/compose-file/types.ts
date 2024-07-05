
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




/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export type {
  IComposeFileConfig,
};
