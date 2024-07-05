import { readRemoteHostConfigFile } from '../shared/utils/index.js';
import { execute } from '../shared/command/index.js';
import { IRemoteHost } from './types.js';
import { IHostName } from '../shared/types.js';

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
  const __HOST_NAME: IHostName = 'remote';

  // the configuration object extracted from the remote-host.config.json file
  const __config = readRemoteHostConfigFile();

  // the SSH address
  const __address = `${__config.server.name}@${__config.server.ip}`;

  // the path to the SSH private key
  const __privateKey = __config.sshPrivateKey;





  /* **********************************************************************************************
   *                                            HELPERS                                           *
   ********************************************************************************************** */

  /**
   * Completes a partial list of arguments that will be used in a SSH Command Execution.
   * @param partialArgs
   * @returns string[]
   */
  const __args = (partialArgs: string[]) => ['-i', __privateKey, ...partialArgs];

  /**
   * Checks if the server is currently turned on and connected to the Internet.
   * @returns Promise<boolean>
   */
  const __isOnline = async (): Promise<boolean> => {
    try {
      await execute('ping', ['-c', '1', '-w', '1', __config.server.ip], 'pipe');
      return true;
    } catch (e) {
      return false;
    }
  };





  /* **********************************************************************************************
   *                                         HOST ACTIONS                                         *
   ********************************************************************************************** */

  /**
   * Establishes a SSH Connection with the remote host.
   * @returns Promise<string | undefined>
   */
  const connect = (): Promise<string | undefined> => execute('ssh', __args([__address]), 'inherit');

  /**
   * Executes the landscape-sysinfo binary and returns its results.
   * @returns Promise<string | undefined>
   */
  const getLandscapeSysInfo = (): Promise<string | undefined> => execute(
    'ssh',
    __args([__address, 'landscape-sysinfo']),
    'pipe',
  );

  /**
   * Reboots the remote host immediately.
   * @returns Promise<string | undefined>
   */
  const reboot = (): Promise<string | undefined> => execute(
    'ssh',
    __args([__address, 'reboot']),
    'inherit',
  );

  /**
   * Shuts down the remote host immediately.
   * @returns Promise<string | undefined>
   */
  const shutdown = (): Promise<string | undefined> => execute(
    'ssh',
    __args([__address, 'poweroff']),
    'inherit',
  );

  /**
   * Copies the SSH Public Key specified in the config file into the remote server.
   * @returns Promise<string | undefined>
   */
  const copySSHPublicKey = (): Promise<string | undefined> => execute(
    'ssh-copy-id',
    __args([__address]),
    'inherit',
  );





  /* **********************************************************************************************
   *                                         HEALTH CHECK                                         *
   ********************************************************************************************** */

  /**
   * It checks if the remote host is running and connected to the Internet.
   * @throws
   * - if the remote host is not running or is unreachable
   */
  if (!await __isOnline()) {
    throw new Error('The remote host is not running or has no access to the Internet.');
  }





  /* **********************************************************************************************
   *                                         MODULE BUILD                                         *
   ********************************************************************************************** */
  return Object.freeze({
    // properties
    get HOST_NAME() {
      return __HOST_NAME;
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
  remoteHostFactory,
};
