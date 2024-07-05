import { IExecutionMode } from '../shared/command/index.js';
import { IHostName } from '../shared/types.js';


/* ************************************************************************************************
 *                                             TYPES                                              *
 ************************************************************************************************ */

/**
 * Local Host
 * The module in charge of exposing the actions that can be performed on the local host.
 */
type ILocalHost = {
  // properties
  NAME: IHostName;

  // command execution
  exec: (command: string, args: string[], mode?: IExecutionMode) => Promise<string | undefined>;
};



/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export type {
  ILocalHost,
};
