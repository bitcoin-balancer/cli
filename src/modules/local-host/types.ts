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
  prune: () => Promise<string | undefined>;
  up: (variation: string | undefined) => Promise<string | undefined>;
  buildUp: (variation: string | undefined) => Promise<string | undefined>;
  buildAndPushImages: () => Promise<string | undefined>;
  down: () => Promise<string | undefined>;
  restart: () => Promise<string | undefined>;
  logs: (variation: string | undefined) => Promise<string | undefined>;
  apiTest: (variation: string) => Promise<string | undefined>;

  // databse management actions
  psql: () => Promise<string | undefined>;

  // cli management actions
  buildCLI: () => Promise<string | undefined>;
};

/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export type { ILocalHost };
