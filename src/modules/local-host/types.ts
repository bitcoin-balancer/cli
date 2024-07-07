

/* ************************************************************************************************
 *                                             TYPES                                              *
 ************************************************************************************************ */

/**
 * Local Host
 * The module in charge of exposing the actions that can be performed on the local host.
 */
type ILocalHost = {
  // properties
  // ...

  // docker compose actions
  buildUp: (variation: string | undefined) => Promise<string | undefined>;
  down: () => Promise<string | undefined>;

  // cli management actions
  buildCLI: () => Promise<string | undefined>;
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export type {
  ILocalHost,
};
