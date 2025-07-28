import { select } from '@inquirer/prompts';
import { ILocalHost, localHostFactory } from '../../local-host/index.js';
import { IRemoteHost, remoteHostFactory } from '../../remote-host/index.js';

/* ************************************************************************************************
 *                                            HELPERS                                             *
 ************************************************************************************************ */

/**
 * Attempts to instantiate a remote host. Returns undefined if it is unable.
 * @returns Promise<IRemoteHost | undefined>
 */
const __getRemoteHost = async (): Promise<IRemoteHost | undefined> => {
  try {
    return await remoteHostFactory();
  } catch (e) {
    return undefined;
  }
};

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Prompts the user a list of available hosts and returns the choice.
 * @returns Promise<ILocalHost | IRemoteHost>
 */
const selectHost = async (): Promise<ILocalHost | IRemoteHost> => {
  // init the hosts
  const local = localHostFactory();
  const remote = await __getRemoteHost();

  // prompt the menu
  return select<ILocalHost | IRemoteHost>({
    message: 'Select a host',
    choices: [
      {
        name: 'Local Host',
        value: local,
      },
      {
        name: 'Remote Host',
        value: <IRemoteHost>remote,
        disabled: remote === undefined ? '(unreachable)' : false,
      },
    ],
  });
};

/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export { selectHost };
