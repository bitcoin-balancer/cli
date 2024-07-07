/* eslint-disable no-console */
import { localHostFactory } from '../modules/local-host/index.js';

/**
 * Build CLI
 * Executes the script to generate a build of the CLI straight from the source code.
 */
export default async () => {
  const host = localHostFactory();
  const payload = await host.buildCLI();
  console.log(payload);
};
