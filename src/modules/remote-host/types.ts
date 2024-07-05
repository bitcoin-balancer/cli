import { IHostName } from '../shared/types.js';

/* ************************************************************************************************
 *                                             TYPES                                              *
 ************************************************************************************************ */

/**
 * Remote Host
 * The module in charge of exposing the actions that can be performed on the remote host.
 */
type IRemoteHost = {
  // properties
  NAME: IHostName;

  // host actions
  connect: () => Promise<string | undefined>;
  getLandscapeSysInfo: () => Promise<string | undefined>;
  reboot: () => Promise<string | undefined>;
  shutdown: () => Promise<string | undefined>;
  copySSHPublicKey: () => Promise<string | undefined>;
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export type {
  IRemoteHost,
};
