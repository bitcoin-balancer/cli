#! /usr/bin/env node
/* eslint-disable no-console */
import { argv } from 'node:process';
import { parseArgs } from 'argv-utils';
import { generateComposeFile } from '../../modules/compose-file/index.js';

/**
 * Compose File
 * Generates the compose.yaml file based on a configuration and the .env file in the host.
 */
(() => {
  // extract the args
  const args = parseArgs(argv);

  // execute the action
  try {
    generateComposeFile({
      testMode: args.testMode === 'true',
      restoreMode: args.restoreMode === 'true',
    });

    // end the process successfully
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
