/* eslint-disable no-console */
import { input } from '@inquirer/prompts';
import { isSrcPathValidForDeployment } from '../modules/envvar-assets/index.js';
import { remoteHostFactory } from '../modules/remote-host/index.js';

/**
 * Deploy Environment Variable Assets
 * Deploys the environment variable assets to the remote host.
 */
export default async () => {
  // handle user input
  const srcPath = await input({
    message: 'Enter the path to the environment variable assets directory',
    validate: isSrcPathValidForDeployment,
  });

  // instantiate the host
  const host = await remoteHostFactory();

  // deploy the assets
  const payload = await host.deployEnvironmentVariableAssets(srcPath);
  console.log(payload);
};
