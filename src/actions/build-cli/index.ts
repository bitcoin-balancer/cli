/* eslint-disable no-console */
import { localHostFactory } from '../../modules/local-host/index.js';

/**
 * Build CLI
 * Builds the CLI from the source code.
 */
export default async () => {
  const host = localHostFactory();
  const payload = await host.buildCLI();
  console.log(payload);
};
