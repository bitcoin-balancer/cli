/* eslint-disable no-console */
import { remoteHostFactory } from '../../modules/remote-host/index.js';

/**
 * ssh-copy-id
 * Copies the SSH Public Key specified in the config file into the remote server.
 */
export default async () => {
  // instantiate the remote host
  const host = await remoteHostFactory();

  // perform the action
  const payload = await host.copySSHPublicKey();
  console.log(payload);
};
