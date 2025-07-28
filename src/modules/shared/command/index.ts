import { spawn } from 'child_process';
import { IExectutionOptions, IExecutionMode } from './types.js';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Builds the options that will be passed to the child_process when executing a command
 * @param mode
 * @returns IExectutionOptions
 */
const __getExectutionOptions = (mode: IExecutionMode): IExectutionOptions => ({
  stdio: mode,
});

/**
 * Executes a given command and subscribes to its events. The promise is resolved once the process
 * indicates it and all the accumulated data is returned (if any). In case no data is accumulated,
 * undefined will be returned.
 * @param command
 * @param args
 * @param mode?
 * @returns Promise<string | undefined>
 */
const execute = (
  command: string,
  args: string[],
  mode: IExecutionMode = 'inherit',
): Promise<string | undefined> =>
  new Promise((resolve, reject) => {
    // init the options based on the mode
    const options = __getExectutionOptions(mode);

    // start the process
    const proc = spawn(command, args, options);

    // init the data
    let data = '';

    // subscribe to the stdout event if available
    if (proc.stdout) {
      proc.stdout.on('data', (stdoutData) => {
        data += stdoutData;
      });
    }

    // subscribe to the stderr event if available
    if (proc.stderr) {
      proc.stderr.on('data', (stderrData) => {
        data += stderrData;
      });
    }

    // subscribe to the error event
    proc.on('error', (error) => {
      reject(error);
    });

    // subscribe to the close event
    proc.on('close', (code) => {
      // if the process didn't exit with status 0 it was unsuccessful
      if (code === 0) {
        resolve(data.length > 0 ? data : undefined);
      } else {
        reject(new Error(`The ${command} process exited with the error code: ${code}`));
      }
    });
  });

/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // types
  type IExecutionMode,

  // implementation
  execute,
};
