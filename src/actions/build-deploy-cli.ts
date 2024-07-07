/* eslint-disable no-console */
import { localHostFactory } from '../modules/local-host/index.js';
import { remoteHostFactory } from '../modules/remote-host/index.js';

/**
 * Build CLI Deploy
 * Builds and deploys the CLI's source code to the remote host.
 */
export default async () => {
  // instantiate the hosts
  let payload = '';
  const localHost = localHostFactory();
  const remoteHost = await remoteHostFactory();

  // generate the build
  payload += await localHost.buildCLI();

  // deploy it to the remote host
  payload += await remoteHost.deployCLI();
  console.log(payload);
};
