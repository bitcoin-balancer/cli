/* eslint-disable no-console */
import { mergePayloads } from '../modules/shared/utils/index.js';
import { localHostFactory } from '../modules/local-host/index.js';
import { remoteHostFactory } from '../modules/remote-host/index.js';

/**
 * Build CLI Deploy
 * Builds and deploys the CLI's source code to the remote host.
 */
export default async () => {
  // instantiate the hosts
  const localHost = localHostFactory();
  const remoteHost = await remoteHostFactory();

  // generate the build
  const buildPayload = await localHost.buildCLI();

  // deploy it to the remote host
  const deployPayload = await remoteHost.deployCLI();
  console.log(mergePayloads([buildPayload, deployPayload]));
};
