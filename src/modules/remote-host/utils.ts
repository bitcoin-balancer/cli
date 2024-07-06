import { IRemoteHostServerConfig } from '../shared/types.js';
import { execute } from '../shared/command/index.js';
import { IRemoteHostUtilities } from './types.js';


/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * The module in charge of providing utility funcs to simplify interactions with the remote host.
 * @param privateKey
 * @param server
 * @returns IRemoteHostUtilities
 */
const remoteHostUtilitiesFactory = (
  privateKey: string,
  server: IRemoteHostServerConfig,
): IRemoteHostUtilities => {
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
  const args = (partialArgs: string[]) => ['-i', __privateKey, ...partialArgs];

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





  /* **********************************************************************************************
   *                                         MODULE BUILD                                         *
   ********************************************************************************************** */
  return Object.freeze({
    // properties
    // ...

    // actions
    args,
    isOnline,
  });
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  remoteHostUtilitiesFactory,
};
