

/* ************************************************************************************************
 *                                             TYPES                                              *
 ************************************************************************************************ */

/**
 * Remote Host
 * The module in charge of exposing the actions that can be performed on the remote host.
 */
type IRemoteHost = {
  // implementation
  connect: () => Promise<string | undefined>;
  getLandscapeSysInfo: () => Promise<string | undefined>;
  copySSHPublicKey: () => Promise<string | undefined>;
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export type {
  IRemoteHost,
};
