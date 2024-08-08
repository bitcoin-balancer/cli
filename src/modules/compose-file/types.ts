
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

  // if enabled, it will trigger the production build for the GUI service
  buildProductionGUI: boolean;

  // if enabled, it will include the Cloudflared Tunnel Service even if the secret is not present
  includeCTService: boolean;
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export type {
  IComposeFileConfig,
};
