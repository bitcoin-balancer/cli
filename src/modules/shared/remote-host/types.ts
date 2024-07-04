

/* ************************************************************************************************
 *                                             TYPES                                              *
 ************************************************************************************************ */

/**
 * Remote Host
 * The module in charge of exposing the actions that can be performed on the remote host.
 */
type IRemoteHost = {
  // host actions
  connect: () => Promise<string | undefined>;
  getLandscapeSysInfo: () => Promise<string | undefined>;
  copySSHPublicKey: () => Promise<string | undefined>;
  reboot: () => Promise<string | undefined>;
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export type {
  IRemoteHost,
};
