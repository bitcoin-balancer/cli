import { execute } from '../shared/command/index.js';
import { IRemoteHostFileSystem, IRemoteHostUtils } from './types.js';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Remote Host File System
 * The module in charge of performing all file system actions on the remote host.
 * @param cliPath
 * @param address
 * @param utils
 * @returns IRemoteHostFileSystem
 */
const remoteHostFileSystemFactory = (
  cliPath: string,
  address: string,
  utils: IRemoteHostUtils,
): IRemoteHostFileSystem => {
  /* **********************************************************************************************
   *                                          PROPERTIES                                          *
   ********************************************************************************************** */

  // the path to the CLI's source code
  const __cli = cliPath;

  // the SSH address
  const __address = address;

  // the remote host utilities' instance
  const __utils = utils;





  /* **********************************************************************************************
   *                                            ACTIONS                                           *
   ********************************************************************************************** */

  /**
   * Pushes a file from the local host to the remote host.
   * @param srcPath
   * @param destPath
   * @returns Promise<string | undefined>
   */
  const pushFile = (srcPath: string, destPath: string): Promise<string | undefined> => (
    execute('scp', __utils.args([srcPath, `${__address}:${destPath}`]), 'inherit')
  );

  /**
   * Removes a file from the remote host.
   * @param filePath
   * @returns Promise<string | undefined>
   */
  const removeFile = (filePath: string): Promise<string | undefined> => (
    execute('ssh', __utils.args([__address, 'rm', filePath]), 'pipe')
  );

  /**
   * Creates a directory in the remote host.
   * @param dirPath
   * @returns Promise<string | undefined>
   */
  const makeDirectory = (dirPath: string): Promise<string | undefined> => (
    execute('ssh', __utils.args([__address, 'mkdir', dirPath]), 'pipe')
  );

  /**
   * Pushes a directory and its contents from the local host to the remote host.
   * @param srcPath
   * @param destPath
   * @returns Promise<string | undefined>
   */
  const pushDirectory = (srcPath: string, destPath: string): Promise<string | undefined> => (
    execute('scp', __utils.args(['-r', srcPath, `${__address}:${destPath}`]), 'inherit')
  );

  /**
   * Removes a directory from the remote host.
   * @param dirPath
   * @returns Promise<string | undefined>
   */
  const removeDirectory = (dirPath: string): Promise<string | undefined> => (
    execute('ssh', __utils.args([__address, 'rm', '-r', '-f', dirPath]), 'pipe')
  );

  /**
   * Removes and creates a brand new directory (completely empty).
   * @param dirPath
   * @returns Promise<string | undefined>
   */
  const cleanDirectory = async (dirPath: string): Promise<string | undefined> => {
    let payload = '';
    payload += await removeDirectory(dirPath);
    payload += await makeDirectory(dirPath);
    return payload;
  };





  /* **********************************************************************************************
   *                                         MODULE BUILD                                         *
   ********************************************************************************************** */
  return Object.freeze({
    // properties
    // ...

    // actions
    pushFile,
    removeFile,
    makeDirectory,
    pushDirectory,
    removeDirectory,
    cleanDirectory,
  });
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  remoteHostFileSystemFactory,
};
