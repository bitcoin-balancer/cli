import { generate } from '../../modules/compose-file/index.js';
import { ILocalHost, localHostFactory } from '../../modules/local-host/index.js';
import { IRemoteHost, remoteHostFactory } from '../../modules/remote-host/index.js';
import { selectHost } from '../../modules/shared/input-utils/index.js';

/**
 * Executes the action on the local host.
 * @param host
 * @param variation
 * @returns Promise<string | undefined>
 */
const __localhostExecution = (
  host: ILocalHost,
  variation: string | undefined,
): Promise<string | undefined> => {
  // generate the compose.yaml file
  generate({ testMode: variation === 'test-mode' });

  // execute the docker compose command
  return host.exec('docker', ['compose', 'up', '--build', '-d']);
};



/**
 * Executes the action on the remote host.
 * @param host
 * @param variation
 * @returns Promise<string | undefined>
 */
const __remoteHostExecution = (
  host: IRemoteHost,
  variation: string | undefined,
): Promise<string | undefined> => Promise.resolve('asd');



/**
 * Build Up
 * Builds all the images and starts the containers. If the variation is provided, it starts the
 * containers in a chosen mode.
 */
export default async (variation: string | undefined) => {
  // init the payload
  let payload: string | undefined;

  // execute the action on the appropriate host
  if (variation === undefined) {
    const host = await selectHost();
    payload = host.NAME === 'local'
      ? await __localhostExecution(<ILocalHost>host, variation)
      : await __remoteHostExecution(<IRemoteHost>host, variation);
  } else if (variation === 'test-mode') {
    payload = await __localhostExecution(localHostFactory(), variation);
  } else {
    payload = await __remoteHostExecution(await remoteHostFactory(), variation);
  }

  // print the payload
  console.log(payload);
};
