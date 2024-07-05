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
  HOST_NAME: IHostName;

};



/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export type {
  ILocalHost,
};
