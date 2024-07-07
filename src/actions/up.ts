/* eslint-disable no-console */
import { ILocalHost, localHostFactory } from '../modules/local-host/index.js';
import { IRemoteHost, remoteHostFactory } from '../modules/remote-host/index.js';
import { selectHost } from '../modules/shared/input-utils/index.js';

/**
 * Up
 * Builds, (re)creates, starts, and attaches to containers for a service based on a chosen mode.
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
  const payload = await host.up(variation);
  console.log(payload);
};
