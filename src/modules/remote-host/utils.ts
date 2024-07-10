import { IRemoteHostServerConfig } from '../shared/utils/types.js';
import { execute } from '../shared/command/index.js';
import { IRemoteHostUtils } from './types.js';


/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Remote Host Utils
 * The module in charge of providing utility funcs to simplify interactions with the remote host.
 * @param privateKey
 * @param server
 * @returns IRemoteHostUtilities
 */
const remoteHostUtilsFactory = (
  privateKey: string,
  server: IRemoteHostServerConfig,
): IRemoteHostUtils => {
  /* **********************************************************************************************
   *                                          PROPERTIES                                          *
   ********************************************************************************************** */

  // the absolute path to the SSH private key
  const __privateKey = privateKey;

  // the remote host server's configuration
  const __server = server;





  /* **********************************************************************************************
   *                                            ACTIONS                                           *
   ********************************************************************************************** */

  /**
   * Completes a partial list of arguments that will be used in a SSH Command Execution.
   * @param partialArgs
   * @returns string[]
   */
  const args = (partialArgs: string[]): string[] => ['-i', __privateKey, ...partialArgs];

  /**
   * Checks if the remote host is currently turned on and connected to the Internet.
   * @returns Promise<boolean>
   */
  const isOnline = async (): Promise<boolean> => {
    try {
      await execute('ping', ['-c', '1', '-w', '1', __server.ip], 'pipe');
      return true;
    } catch (e) {
      return false;
    }
  };

  /**
   * Generates the name to be used for a database backup.
   * @returns string
   */
  const generateDatabaseBackupName = (): string => `${Date.now()}.dump`;





  /* **********************************************************************************************
   *                                         MODULE BUILD                                         *
   ********************************************************************************************** */
  return Object.freeze({
    // properties
    // ...

    // actions
    args,
    isOnline,
    generateDatabaseBackupName,
  });
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  remoteHostUtilsFactory,
};
