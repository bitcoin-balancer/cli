

/* ************************************************************************************************
 *                                             TYPES                                              *
 ************************************************************************************************ */

/**
 * Exection Mode
 * The way a command will be executed. More info:
 * https://nodejs.org/docs/latest/api/child_process.html#optionsstdio
 */
type IExecutionMode = 'overlapped' | 'inherit' | 'pipe' | 'ignore';

/**
 * Execution Options
 * The options that will be passed to the child_process.
 */
type IExectutionOptions = {
  // the standard input-output header that will be used in the execution
  stdio: IExecutionMode
};



/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export type {
  IExecutionMode,
  IExectutionOptions,
};
