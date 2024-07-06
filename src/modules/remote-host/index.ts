import { IHostName } from '../shared/types.js';
import { readRemoteHostConfigFile } from '../shared/utils/index.js';
import { execute } from '../shared/command/index.js';
import { remoteHostUtilsFactory } from './utils.js';
import { remoteHostFileSystemFactory } from './fs.js';
import { IRemoteHost } from './types.js';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Generates an instance of the Remote Host.
 * @returns Promise<IRemoteHost>
 * @throws
 * - if the configuration file doesn't exist or is invalid
 * - if the remote host is not running or is unreachable
 */
const remoteHostFactory = async (): Promise<IRemoteHost> => {
  /* **********************************************************************************************
   *                                          PROPERTIES                                          *
   ********************************************************************************************** */

  // the name of the host
  const __NAME: IHostName = 'remote';

  // the configuration object extracted from the remote-host.config.json file
  const __config = readRemoteHostConfigFile();

  // the absolute path to the CLI's source code
  const __cli = __config.cli;

  // the absolute path to the SSH private key
  const __privateKey = __config.sshPrivateKey;

  // the SSH address
  const __address = `${__config.server.name}@${__config.server.ip}`;

  // the remote host utilities' instance
  const __utils = remoteHostUtilsFactory(__privateKey, __config.server);

  // the remote host file system's instance
  const __fs = remoteHostFileSystemFactory(__address, __utils);





  /* **********************************************************************************************
   *                                         HOST ACTIONS                                         *
   ********************************************************************************************** */

  /**
   * Establishes a SSH Connection with the remote host.
   * @returns Promise<string | undefined>
   */
  const connect = (): Promise<string | undefined> => (
    execute('ssh', __utils.args([__address]), 'inherit')
  );

  /**
   * Executes the landscape-sysinfo binary and returns its results.
   * @returns Promise<string | undefined>
   */
  const getLandscapeSysInfo = (): Promise<string | undefined> => (
    execute('ssh', __utils.args([__address, 'landscape-sysinfo']), 'pipe')
  );

  /**
   * Reboots the remote host immediately.
   * @returns Promise<string | undefined>
   */
  const reboot = (): Promise<string | undefined> => (
    execute('ssh', __utils.args([__address, 'reboot']), 'inherit')
  );

  /**
   * Shuts down the remote host immediately.
   * @returns Promise<string | undefined>
   */
  const shutdown = (): Promise<string | undefined> => (
    execute('ssh', __utils.args([__address, 'poweroff']), 'inherit')
  );

  /**
   * Copies the SSH Public Key specified in the config file into the remote server.
   * @returns Promise<string | undefined>
   */
  const copySSHPublicKey = (): Promise<string | undefined> => (
    execute('ssh-copy-id', __utils.args([__address]), 'inherit')
  );





  /* **********************************************************************************************
   *                                         HEALTH CHECK                                         *
   ********************************************************************************************** */

  /**
   * It checks if the remote host is running and connected to the Internet.
   * @throws
   * - if the remote host is not running or is unreachable
   */
  if (!await __utils.isOnline()) {
    throw new Error('The remote host is not running or has no access to the Internet.');
  }





  /* **********************************************************************************************
   *                                         MODULE BUILD                                         *
   ********************************************************************************************** */
  return Object.freeze({
    // properties
    get NAME() {
      return __NAME;
    },

    // host actions
    connect,
    getLandscapeSysInfo,
    reboot,
    shutdown,
    copySSHPublicKey,
  });
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // types
  type IRemoteHost,

  // factory
  remoteHostFactory,
};
