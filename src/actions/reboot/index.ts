import { remoteHostFactory } from '../../modules/shared/remote-host/index.js';

/**
 * Reboot
 * Reboots the remote host immediately.
 */
export default async () => {
  // instantiate the remote host
  const host = await remoteHostFactory();

  // perform the action
  const payload = await host.reboot();
  console.log(payload);
};
