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

  // helpers
  localCLIPath: (elementPath?: string) => string;
  remoteCLIPath: (elementPath?: string) => string;

  // actions
  pushFile: (srcPath: string, destPath: string) => Promise<string | undefined>;
  removeFile: (filePath: string) => Promise<string | undefined>;
  makeDirectory: (dirPath: string) => Promise<string | undefined>;
  pushDirectory: (srcPath: string, destPath: string) => Promise<string | undefined>;
  removeDirectory: (dirPath: string) => Promise<string | undefined>;

  // deployment helpers
  deploy: (localPath: string, remotePath: string) => Promise<string | undefined>;
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

  // cli management actions
  deployCLI: () => Promise<string>;

  // environment variable assets actions
  deployEnvironmentVariableAssets: (srcPath: string) => Promise<string>;
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export type {
  IRemoteHostUtils,
  IRemoteHostFileSystem,
  IRemoteHost,
};
