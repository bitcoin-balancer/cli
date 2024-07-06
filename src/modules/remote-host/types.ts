import { IHostName } from '../shared/types.js';

/* ************************************************************************************************
 *                                             TYPES                                              *
 ************************************************************************************************ */

/**
 * Remote Host Utils
 * The module in charge of providing utility funcs to simplify interactions with the remote host.
 */
type IRemoteHostUtils = {
  // properties
  // ...

  // actions
  args: (partialArgs: string[]) => string[];
  isOnline: () => Promise<boolean>;
};

/**
 * Remote Host File System
 * The module in charge of performing file system actions on the remote host.
 */
type IRemoteHostFileSystem = {
  // properties
  // ...

  // actions

};

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
  IRemoteHostUtils,
  IRemoteHostFileSystem,
  IRemoteHost,
};
