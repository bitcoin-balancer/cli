/* eslint-disable no-console */
import { ILocalHost } from '../../modules/local-host/index.js';
import { IRemoteHost } from '../../modules/remote-host/index.js';
import { selectHost } from '../../modules/shared/input-utils/index.js';

/**
 * Executes the action on the local host.
 * @param host
 * @returns Promise<string | undefined>
 */
const __localhostExecution = (host: ILocalHost): Promise<string | undefined> => host.exec('docker', ['compose', 'down']);



/**
 * Executes the action on the remote host.
 * @param host
 * @returns Promise<string | undefined>
 */
const __remoteHostExecution = (host: IRemoteHost): Promise<string | undefined> => Promise.resolve('asd');



/**
 * Down
 * Stops containers and removes containers, networks, volumes, and images created by up.
 */
export default async () => {
  // select the host
  const host = await selectHost();

  // execute the action
  const payload: string | undefined = host.NAME === 'local'
    ? await __localhostExecution(<ILocalHost>host)
    : await __remoteHostExecution(<IRemoteHost>host);

  // print the payload
  console.log(payload);
};
