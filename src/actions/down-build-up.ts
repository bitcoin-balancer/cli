/* eslint-disable no-console */
import { ILocalHost, localHostFactory } from '../modules/local-host/index.js';
import { IRemoteHost, remoteHostFactory } from '../modules/remote-host/index.js';
import { selectHost } from '../modules/shared/input-utils/index.js';

/**
 * Down Build Up
 * Stops containers and removes containers, networks, volumes, and images created by up. Afterwards,
 * it builds all the images and starts the containers. If the variation is provided, it starts the
 * containers in a chosen mode.
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

  // stop and remove containers
  const downPayload = await host.down();
  console.log(downPayload);

  // build images and start containers
  const buildUpPayload = await host.buildUp(variation);
  console.log(buildUpPayload);
};
