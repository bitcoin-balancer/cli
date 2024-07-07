/* eslint-disable no-console */
import { remoteHostFactory } from '../modules/remote-host/index.js';

/**
 * Shutdown
 * Powers off the remote host immediately.
 */
export default async () => {
  // instantiate the remote host
  const host = await remoteHostFactory();

  // perform the action
  const payload = await host.shutdown();
  console.log(payload);
};
