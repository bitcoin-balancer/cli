/* eslint-disable no-console */
import { ILocalHost } from '../modules/local-host/index.js';
import { IRemoteHost } from '../modules/remote-host/index.js';
import { selectHost } from '../modules/shared/input-utils/index.js';

/**
 * Logs
 * Displays log output from all services. If a variation is provided, it narrows down the logs to a
 * specific service.
 */
export default async (variation: string | undefined) => {
  const host: ILocalHost | IRemoteHost = await selectHost();
  const payload = await host.logs(variation);
  console.log(payload);
};
