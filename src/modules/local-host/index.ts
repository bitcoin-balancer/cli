import { execute } from '../shared/command/index.js';
import { generate } from '../compose-file/index.js';
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
   * Builds all the images and starts the containers. If the variation is provided, it starts the
   * containers in a chosen mode.
   * @param variation
   * @returns Promise<string | undefined>
   */
  const buildUp = async (variation: string | undefined): Promise<string | undefined> => {
    // generate the compose.yaml file
    generate({ testMode: variation === 'test-mode' });

    // execute the docker compose command
    return execute('docker', ['compose', 'up', '--build', '--detach']);
  };

  /**
   * Stops containers and removes containers, networks, volumes, and images created by up.
   * @returns Promise<string | undefined>
   */
  const down = (): Promise<string | undefined> => execute('docker', ['compose', 'down']);



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
    buildUp,
    down,

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
