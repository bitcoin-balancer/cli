import { isFile } from 'fs-utils-sync';
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
   *                                            HELPERS                                           *
   ********************************************************************************************** */

  /**
   * Builds the absolute path for a CLI's element in the local host. If the element's path is not
   * provided, it returns the root path.
   * @param elementPath?
   * @returns string
   */
  const localCLIPath = (elementPath?: string): string => (
    `${__cli}${typeof elementPath === 'string' ? `/${elementPath}` : ''}`
  );

  /**
   * Builds the absolute path for a CLI's element in the remote host. If the element's path is not
   * provided, it returns the root path.
   * @param elementPath?
   * @returns string
   */
  const remoteCLIPath = (elementPath?: string): string => (
    `cli${typeof elementPath === 'string' ? `/${elementPath}` : ''}`
  );





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
    execute('scp', __utils.args([srcPath, `${__address}:${destPath}`]))
  );

  /**
   * Removes a file from the remote host.
   * @param filePath
   * @returns Promise<string | undefined>
   */
  const removeFile = (filePath: string): Promise<string | undefined> => (
    execute('ssh', __utils.args([__address, 'rm', '-f', filePath]))
  );

  /**
   * Creates a directory in the remote host.
   * @param dirPath
   * @returns Promise<string | undefined>
   */
  const makeDirectory = (dirPath: string): Promise<string | undefined> => (
    execute('ssh', __utils.args([__address, 'mkdir', '-p', dirPath]))
  );

  /**
   * Pushes a directory and its contents from the local host to the remote host.
   * @param srcPath
   * @param destPath
   * @returns Promise<string | undefined>
   */
  const pushDirectory = (srcPath: string, destPath: string): Promise<string | undefined> => (
    execute('scp', __utils.args(['-r', srcPath, `${__address}:${destPath}`]))
  );

  /**
   * Removes a directory from the remote host.
   * @param dirPath
   * @returns Promise<string | undefined>
   */
  const removeDirectory = (dirPath: string): Promise<string | undefined> => (
    execute('ssh', __utils.args([__address, 'rm', '-r', '-f', dirPath]))
  );

  /**
   * Removes and creates a brand new directory (completely empty).
   * @param dirPath
   * @returns Promise<string | undefined>
   */
  /* const cleanDirectory = async (dirPath: string): Promise<string | undefined> => {
    let payload = '';
    payload += await removeDirectory(dirPath);
    payload += await makeDirectory(dirPath);
    return payload;
  }; */





  /* **********************************************************************************************
   *                                      DEPLOYMENT HELPERS                                      *
   ********************************************************************************************** */

  /**
   * Removes a file from the remote host (if exists) and then pushes the local version.
   * @param localPath
   * @param remotePath
   * @returns Promise<string | undefined>
   */
  const __deployFile = async (
    localPath: string,
    remotePath: string,
  ): Promise<string | undefined> => {
    let payload = '';
    payload += await removeFile(remotePath);
    payload += await pushFile(localPath, remotePath);
    return payload;
  };

  /**
   * Removes a directory from the remote host (if exists) and then pushes the local version.
   * @param localPath
   * @param remotePath
   * @returns Promise<string | undefined>
   */
  const __deployDirectory = async (
    localPath: string,
    remotePath: string,
  ): Promise<string | undefined> => {
    let payload = '';
    payload += await removeDirectory(remotePath);
    payload += await pushDirectory(localPath, remotePath);
    return payload;
  };

  /**
   * Removes a file or a directory from the remote host (if exists) and then pushes the local
   * version.
   * @param localPath
   * @param remotePath
   * @returns Promise<string | undefined>
   */
  const deploy = (localPath: string, remotePath: string): Promise<string | undefined> => (
    isFile(localPath)
      ? __deployFile(localPath, remotePath)
      : __deployDirectory(localPath, remotePath)
  );





  /* **********************************************************************************************
   *                                         MODULE BUILD                                         *
   ********************************************************************************************** */
  return Object.freeze({
    // properties
    // ...

    // helpers
    localCLIPath,
    remoteCLIPath,

    // actions
    pushFile,
    removeFile,
    makeDirectory,
    pushDirectory,
    removeDirectory,

    // deployment helpers
    deploy,
  });
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  remoteHostFileSystemFactory,
};
