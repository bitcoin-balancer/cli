import { IHostName } from '../shared/types.js';
import { readRemoteHostConfigFile } from '../shared/utils/index.js';
import { execute, IExecutionMode } from '../shared/command/index.js';
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

  // the details required to interact with the remote host
  const __server = __config.server;

  // the SSH address
  const __address = `${__server.name}@${__server.ip}`;

  // the list of assets that will be deployed to the remote host
  const __sourceCode = __config.sourceCode;

  // the remote host utilities' instance
  const __utils = remoteHostUtilsFactory(__privateKey, __server);

  // the remote host file system's instance
  const __fs = remoteHostFileSystemFactory(__cli, __address, __utils);





  /* **********************************************************************************************
   *                                       COMMAND EXECUTION                                      *
   ********************************************************************************************** */

  /**
   * Executes a command via SSH on the remote host.
   * @param args
   * @param mode?
   * @returns Promise<string | undefined>
   */
  const __ssh = (args: string[], mode: IExecutionMode = 'inherit'): Promise<string | undefined> => (
    execute('ssh', __utils.args(args), mode)
  );

  /**
   * Executes a CLI command via SSH on the remote host.
   * @param args
   * @param mode?
   * @returns Promise<string | undefined>
   */
  const __sshCLI = (args: string[], mode?: IExecutionMode): Promise<string | undefined> => __ssh(
    [__address, 'cd', __fs.remoteCLIPath(), '&&', ...args],
    mode,
  );

  /**
   * Executes a node or npm command in the CLI root directory.
   * @param command
   * @returns Promise<string | undefined>
   */
  const __node = (command: string): Promise<string | undefined> => __sshCLI([`bash -i -c "${command}"`]);





  /* **********************************************************************************************
   *                                         HOST ACTIONS                                         *
   ********************************************************************************************** */

  /**
   * Establishes a SSH Connection with the remote host.
   * @returns Promise<string | undefined>
   */
  const connect = (): Promise<string | undefined> => __ssh([__address]);

  /**
   * Executes the landscape-sysinfo binary and returns its results.
   * @returns Promise<string | undefined>
   */
  const getLandscapeSysInfo = (): Promise<string | undefined> => __ssh(
    [__address, 'landscape-sysinfo'],
  );

  /**
   * Reboots the remote host immediately.
   * @returns Promise<string | undefined>
   */
  const reboot = (): Promise<string | undefined> => __ssh([__address, 'reboot']);

  /**
   * Shuts down the remote host immediately.
   * @returns Promise<string | undefined>
   */
  const shutdown = (): Promise<string | undefined> => __ssh([__address, 'poweroff']);

  /**
   * Copies the SSH Public Key specified in the config file into the remote server.
   * @returns Promise<string | undefined>
   */
  const copySSHPublicKey = (): Promise<string | undefined> => (
    execute('ssh-copy-id', __utils.args([__address]))
  );





  /* **********************************************************************************************
   *                                    CLI MANAGEMENT ACTIONS                                    *
   ********************************************************************************************** */

  /**
   * Deploys the CLI from its source in the local host to the remote host.
   * @returns Promise<string | undefined>
   */
  const deployCLI = async (): Promise<string | undefined> => {
    // create the root directory (if it doesn't exist)
    const rootDirPayload = await __fs.makeDirectory(__fs.remoteCLIPath());

    // deploy the source code
    const deploymentPayloads = await Promise.all(__sourceCode.map((elementPath) => __fs.deploy(
      __fs.localCLIPath(elementPath),
      __fs.remoteCLIPath(elementPath),
    )));

    // install the dependencies
    const dependenciesPayload = await __node('npm ci --omit=dev');

    // join all the payloads and return them
    return [rootDirPayload, ...deploymentPayloads, dependenciesPayload].join('\n');
  };





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

    // cli management actions
    deployCLI,
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
