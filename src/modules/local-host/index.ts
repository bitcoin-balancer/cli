import { IHostName } from '../shared/types.js';
import { execute } from '../shared/command/index.js';
import { ILocalHost } from './types.js';
import { IExecutionMode } from '../shared/command/types.js';


/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */
const localHostFactory = (): ILocalHost => {
  /* **********************************************************************************************
   *                                          PROPERTIES                                          *
   ********************************************************************************************** */

  // the name of the host
  const __NAME: IHostName = 'local';





  /* **********************************************************************************************
   *                                       COMMAND EXECUTION                                      *
   ********************************************************************************************** */

  /**
   * Executes a given command on local host.
   * @param command
   * @param args
   * @param mode
   * @returns Promise<string | undefined>
   */
  const exec = (
    command: string,
    args: string[],
    mode: IExecutionMode = 'inherit',
  ): Promise<string | undefined> => execute(command, args, mode);





  /* **********************************************************************************************
   *                                           ACTIONS                                            *
   ********************************************************************************************** */

  /**
   * Executes the script to perform a build of the CLI from the source code.
   * @returns Promise<string | undefined>
   */
  const buildCLI = (): Promise<string | undefined> => exec('npm', ['run', 'build']);




  /* **********************************************************************************************
   *                                         MODULE BUILD                                         *
   ********************************************************************************************** */
  return Object.freeze({
    // properties
    get NAME() {
      return __NAME;
    },

    // command execution
    exec,

    // actions
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
