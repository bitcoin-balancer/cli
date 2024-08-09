import { mergePayloads } from '../shared/utils/index.js';
import { execute } from '../shared/command/index.js';
import { generateComposeFile } from '../compose-file/index.js';
import { ILocalHost } from './types.js';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Generates an instance of the Local Host.
 * @returns ILocalHost
 */
const localHostFactory = (): ILocalHost => {
  /* **********************************************************************************************
   *                                          PROPERTIES                                          *
   ********************************************************************************************** */

  // ...





  /* **********************************************************************************************
   *                                    DOCKER COMPOSE ACTIONS                                    *
   ********************************************************************************************** */

  /**
   * Removes all unused containers, networks and images (both dangling and unused).
   * @returns Promise<string | undefined>
   */
  const prune = (): Promise<string | undefined> => (
    execute('docker', ['system', 'prune', '--all', '--force'])
  );

  /**
   * Builds, (re)creates, starts, and attaches to containers for a service based on a chosen mode.
   * @param variation
   * @returns Promise<string | undefined>
   */
  const up = async (variation: string | undefined): Promise<string | undefined> => {
    // generate the compose.yaml file
    generateComposeFile({ testMode: variation === 'test-mode' });

    // execute the docker compose command
    return execute('docker', ['compose', 'up', '--detach']);
  };

  /**
   * Builds all the images and starts the containers. If the variation is provided, it starts the
   * containers in a chosen mode.
   * @param variation
   * @returns Promise<string | undefined>
   */
  const buildUp = async (variation: string | undefined): Promise<string | undefined> => {
    // generate the compose.yaml file
    generateComposeFile({ testMode: variation === 'test-mode' });

    // execute the docker compose command
    return execute('docker', ['compose', 'up', '--build', '--detach']);
  };

  /**
   * Removes all unused containers, networks and images (both dangling and unused). Then, it builds
   * all the images and pushes them to the registry (Docker Hub).
   * @returns Promise<string>
   */
  const buildAndPushImages = async (): Promise<string | undefined> => {
    // generate the compose.yaml file
    generateComposeFile({ buildProductionGUI: true, includeCTService: true });

    // prune the system
    const prunePayload = await prune();

    // build and push the images
    const buildAndPushPayload = await execute('docker', ['compose', 'build', '--push']);

    // return the payloads
    return mergePayloads([prunePayload, buildAndPushPayload]);
  };

  /**
   * Stops containers and removes containers, networks, volumes, and images created by up.
   * @returns Promise<string | undefined>
   */
  const down = (): Promise<string | undefined> => execute('docker', ['compose', 'down']);

  /**
   * Restarts all stopped and running services.
   * @returns Promise<string | undefined>
   */
  const restart = (): Promise<string | undefined> => execute('docker', ['compose', 'restart']);

  /**
   * Displays log output from services. If a variation is provided, it narrows down the logs to a
   * specific service.
   * @param variation
   * @returns Promise<string | undefined>
   */
  const logs = async (variation: string | undefined): Promise<string | undefined> => {
    if (typeof variation === 'string') {
      return execute('docker', ['compose', 'logs', variation, '-f']);
    }
    return execute('docker', ['compose', 'logs', '-f']);
  };

  /**
   * Runs the tests for a chosen variation.
   * @param variation
   * @returns Promise<string | undefined>
   */
  const apiTest = (variation: string): Promise<string | undefined> => (
    execute('docker', ['compose', 'exec', 'api', 'npm', 'run', `test:${variation}`])
  );





  /* **********************************************************************************************
   *                                 DATABASE MANAGEMENT ACTIONS                                  *
   ********************************************************************************************** */

  /**
   * Initializes a psql session in the postgres container.
   * @returns Promise<string | undefined>
   */
  const psql = (): Promise<string | undefined> => (
    execute('docker', ['compose', 'exec', '-it', 'postgres', 'psql', '-U', 'postgres'])
  );




  /* **********************************************************************************************
   *                                    CLI MANAGEMENT ACTIONS                                    *
   ********************************************************************************************** */

  /**
   * Executes the script to generate a build of the CLI straight from the source code.
   * @returns Promise<string | undefined>
   */
  const buildCLI = (): Promise<string | undefined> => execute('npm', ['run', 'build']);





  /* **********************************************************************************************
   *                                         MODULE BUILD                                         *
   ********************************************************************************************** */
  return Object.freeze({
    // properties
    // ...

    // docker compose actions
    prune,
    up,
    buildUp,
    buildAndPushImages,
    down,
    restart,
    logs,
    apiTest,

    // database management actions
    psql,

    // cli management actions
    buildCLI,
  });
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // types
  type ILocalHost,

  // factory
  localHostFactory,
};
