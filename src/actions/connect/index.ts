import { remoteHostFactory } from '../../modules/shared/remote-host/index.js';

/**
 * Connect
 * Establishes a SSH Connection with the remote host.
 */
export default async () => {
  // instantiate the remote host
  const host = remoteHostFactory();

  // ensure the host is running and has internet
  if (!await host.isOnline()) {
    throw new Error('The remote host is not running or has no access to the Internet.');
  }

  // perform the action
  const payload = await host.connect();
  console.log(payload);
};
