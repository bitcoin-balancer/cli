import { basename } from 'node:path';
import { readRemoteHostConfigFile, mergePayloads } from '../shared/utils/index.js';
import { execute, IExecutionMode } from '../shared/command/index.js';
import { remoteHostUtilsFactory } from './utils.js';
import { remoteHostFileSystemFactory } from './fs.js';
import { isDatabaseBackupDestPathValid, isDatabaseBackupSrcPathValid } from './validations.js';
import { INodeScriptName, IVolumeName, IRemoteHost } from './types.js';

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

  // the name of the volume used to manage the PostgreSQL database backup and restore actions
  // do not confuse this volume with 'pgdata' which is where the actual data is stored
  const __pgdataManagementVolume: IVolumeName = 'balancer_pgdata-management';

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
   * Node & npm commands must be invoked this way because when a command is executed via SSH, the
   * shell doesn't load the user profiles and therefore, doesn't know where the node and npm
   * binaries are, leading to 'npm: command not found' errors. More info:
   * - https://stackoverflow.com/questions/31472755/sudo-npm-command-not-found
   * - https://stackoverflow.com/questions/32090974/what-does-the-shcannot-set-terminal-process-group-1-inappropriate-ioctl-for
   * - https://github.com/flathub/com.visualstudio.code/issues/315
   * @param command
   * @returns Promise<string | undefined>
   */
  const __node = (command: string): Promise<string | undefined> => __sshCLI(
    [`bash -i -c "${command}"`],
  );

  /**
   * Executes a script using Node.js's binary.
   * @param name
   * @param flags?
   * @returns Promise<string | undefined>
   */
  const __nodeScript = (name: INodeScriptName, flags?: string): Promise<string | undefined> => (
    __node(`node ${__fs.remoteScriptPath(name)}${typeof flags === 'string' ? ` ${flags}` : ''}`)
  );





  /* **********************************************************************************************
   *                                       SCRIPT EXECUTION                                       *
   ********************************************************************************************** */

  /**
   * Generates the compose.yaml file based a custom mode.
   * @param variation
   * @returns Promise<string | undefined>
   */
  const __composeFile = (variation: string | undefined): Promise<string | undefined> => {
    if (variation === 'restore-mode') {
      return __nodeScript('compose-file', '--restoreMode');
    }
    return __nodeScript('compose-file');
  };




  /* **********************************************************************************************
   *                                         HOST ACTIONS                                         *
   ********************************************************************************************** */

  /**
   * Establishes a SSH Connection with the remote host.
   * @returns Promise<string | undefined>
   */
  const connect = (): Promise<string | undefined> => __ssh([__address]);

  /**
   * Executes the landscape-sysinfo binary, extracts the running docker containers and returns
   * its results.
   * @returns Promise<string | undefined>
   */
  const getLandscapeSysInfo = async (): Promise<string | undefined> => {
    // execute the landscape-sysinfo binary
    const landscapeSysInfoPayload = await __ssh([__address, 'landscape-sysinfo']);

    // execute the docker compose ps binary
    const dockerComposePSPayload = await __sshCLI(['docker', 'compose', 'ps']);

    // finally, return the combined payloads
    return mergePayloads([landscapeSysInfoPayload, dockerComposePSPayload]);
  };

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
   *                                    DOCKER COMPOSE ACTIONS                                    *
   ********************************************************************************************** */

  /**
   * Pulls the latest images and starts the containers. If the variation is provided, it starts the
   * containers in a chosen mode.
   * @param variation
   * @returns Promise<string | undefined>
   */
  const up = async (variation: string | undefined): Promise<string | undefined> => {
    // build the compose.yaml file based on the variation
    const composeFilePayload = await __composeFile(variation);

    // execute a pull to make sure it's running the latest images
    const pullPayload = await __sshCLI([
      'docker', 'compose', 'up', '--pull', 'always', '--no-build', '--detach',
    ]);

    // return the payloads
    return mergePayloads([composeFilePayload, pullPayload]);
  };

  /**
   * Pulls the latest images and starts the containers. If the variation is provided, it starts the
   * containers in a chosen mode.
   * @param variation
   * @returns Promise<string | undefined>
   */
  const buildUp = async (variation: string | undefined): Promise<string | undefined> => {
    // build the compose.yaml file based on the variation
    const composeFilePayload = await __composeFile(variation);

    // execute a pull to make sure it's running the latest images
    const pullPayload = await __sshCLI([
      'docker', 'compose', 'up', '--pull', 'always', '--no-build', '--detach',
    ]);

    // return the payloads
    return mergePayloads([composeFilePayload, pullPayload]);
  };

  /**
   * Stops containers and removes containers, networks, volumes, and images created by up.
   * @returns Promise<string | undefined>
   */
  const down = (): Promise<string | undefined> => __sshCLI(['docker', 'compose', 'down']);

  /**
   * Restarts all stopped and running services.
   * @returns Promise<string | undefined>
   */
  const restart = (): Promise<string | undefined> => __sshCLI(['docker', 'compose', 'restart']);

  /**
   * Displays log output from services. If a variation is provided, it narrows down the logs to a
   * specific service.
   * @param variation
   * @returns Promise<string | undefined>
   */
  const logs = async (variation: string | undefined): Promise<string | undefined> => {
    if (typeof variation === 'string') {
      return __sshCLI(['docker', 'compose', 'logs', variation, '-f']);
    }
    return __sshCLI(['docker', 'compose', 'logs', '-f']);
  };

  /**
   * Removes all unused containers, networks and images (both dangling and unused).
   * @returns Promise<string | undefined>
   */
  const prune = (): Promise<string | undefined> => (
    __ssh([__address, 'docker', 'system', 'prune', '--all', '--force'])
  );





  /* **********************************************************************************************
   *                                 DATABASE MANAGEMENT ACTIONS                                  *
   ********************************************************************************************** */

  /**
   * Initializes a psql session in the postgres container.
   * @returns Promise<string | undefined>
   */
  const psql = (): Promise<string | undefined> => __sshCLI([
    'docker', 'compose', 'exec', '-it', 'postgres', 'psql', '-U', 'postgres',
  ]);

  /**
   * Generates a database backup file, pulls it to the local host and performs a clean up once
   * complete.
   * @param destPath
   * @returns Promise<string>
   */
  const generateDatabaseBackup = async (destPath: string): Promise<string> => {
    // generate the name of the backup file and the remote path
    const name = __utils.generateDatabaseBackupName();

    // generate the backup file's path within the postgres container
    const relativePath = `/var/lib/pgdata-management/${name}`;

    // generate the backup file
    const backupPayload = await __sshCLI([
      'docker', 'compose', 'exec', 'postgres', 'pg_dump', '-U', 'postgres', '-f', relativePath, '-Fc',
    ]);

    // calculate the absolute path for the volume and the backup file
    const volumeAbsolutePath = await __fs.getAbsolutePathForRemoteVolume(__pgdataManagementVolume);
    const backupAbsolutePath = `${volumeAbsolutePath}/${name}`;

    // pull the backup file to the local host
    const pullPayload = await __fs.pullFile(backupAbsolutePath, destPath);

    // delete the file from the volume
    const cleanupPayload = await __fs.removeFile(backupAbsolutePath);

    // finally, return the merged payloads
    return mergePayloads([backupPayload, pullPayload, cleanupPayload]);
  };

  /**
   * Restores a chosen backup file after cleaning the current state of the database and performs a
   * clean up once complete.
   * @param srcPath
   * @returns Promise<string>
   */
  const restoreDatabaseBackup = async (srcPath: string): Promise<string> => {
    // init the name of the backup file
    const backupFileName = basename(srcPath);

    // retrieve the absolute path to the pgdata-management volume
    const volumeAbsolutePath = await __fs.getAbsolutePathForRemoteVolume(__pgdataManagementVolume);
    const backupAbsolutePath = `${volumeAbsolutePath}/${backupFileName}`;

    // push the backup file directly into the pgdata-management volume
    const pushPayload = await __fs.pushFile(srcPath, backupAbsolutePath);

    // restore the database
    const relativePath = `/var/lib/pgdata-management/${backupFileName}`;
    const restorePayload = await __sshCLI([
      'docker', 'compose', 'exec', 'postgres', 'pg_restore', '--clean', '--if-exists',
      '-U', 'postgres', '-d', 'postgres', relativePath,
    ]);

    // clean the pgdata-management volume
    const cleanupPayload = await __fs.removeFile(backupAbsolutePath);

    // finally, return the merge payloads
    return mergePayloads([pushPayload, restorePayload, cleanupPayload]);
  };





  /* **********************************************************************************************
   *                                    CLI MANAGEMENT ACTIONS                                    *
   ********************************************************************************************** */

  /**
   * Deploys the CLI from its source in the local host to the remote host.
   * @returns Promise<string>
   */
  const deployCLI = async (): Promise<string> => {
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
    return mergePayloads([rootDirPayload, ...deploymentPayloads, dependenciesPayload]);
  };





  /* **********************************************************************************************
   *                             ENVIRONMENT VARIABLE ASSETS ACTIONS                              *
   ********************************************************************************************** */

  /**
   * Deploys the environment variable assets to the remote host and sets the appropriate permissions
   * for all the files.
   * Actions are executed on the remote by the 'root' user, which can cause some issues when
   * dealing with files as some processes may not have the correct permissions. Therefore, this
   * action sets these on each secret file: chmod u=rwx,o=r secrets/SECRET_NAME.txt so any process
   * can have access to it.
   * @param srcPath
   * @returns Promise<string>
   */
  const deployEnvironmentVariableAssets = async (srcPath: string): Promise<string> => {
    // push the assets
    const assetsDeploymentPayload = await Promise.all([
      __fs.deploy(`${srcPath}/.env`, __fs.remoteCLIPath('.env')),
      __fs.deploy(`${srcPath}/secrets`, __fs.remoteCLIPath('secrets')),
    ]);

    // finally, return the combined payloads
    return mergePayloads(assetsDeploymentPayload);
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
    // ...

    // host actions
    connect,
    getLandscapeSysInfo,
    reboot,
    shutdown,
    copySSHPublicKey,

    // docker compose actions
    up,
    buildUp,
    down,
    restart,
    logs,
    prune,

    // databse management actions
    psql,
    generateDatabaseBackup,
    restoreDatabaseBackup,

    // cli management actions
    deployCLI,

    // environment variable assets actions
    deployEnvironmentVariableAssets,
  });
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // types
  type IRemoteHost,

  // validations
  isDatabaseBackupDestPathValid,
  isDatabaseBackupSrcPathValid,

  // factory
  remoteHostFactory,
};
