/* eslint-disable no-console */
import { ILocalHost, localHostFactory } from '../modules/local-host/index.js';
import { IRemoteHost, remoteHostFactory } from '../modules/remote-host/index.js';
import { selectHost } from '../modules/shared/input-utils/index.js';

/**
 * Logs
 * Displays log output from services. If a variation is provided, it narrows down the logs to a
 * specific service.
 */
export default async (variation: string | undefined) => {
  // select the host
  let host: ILocalHost | IRemoteHost;
  if (variation === undefined) {
    host = await selectHost();
  } else if (variation === 'test-mode') {
    host = localHostFactory();
  } else {
    host = await remoteHostFactory();
  }

  // execute the action
  const payload = await host.logs(variation);
  console.log(payload);
};
