import { remoteHostFactory } from '../../modules/shared/remote-host/index.js';

/**
 * Connect
 * Establishes a SSH Connection with the remote host.
 */
export default async () => {
  // instantiate the remote host
  const host = await remoteHostFactory();

  // perform the action
  const payload = await host.connect();
  console.log(payload);
};
