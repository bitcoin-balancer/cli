#! /usr/bin/env node
/* eslint-disable no-console */
import { argv } from 'node:process';
import { parseArgs } from 'argv-utils';

/**
 * Compose File
 * ...
 */
(async () => {
  // extract the args
  const args = parseArgs(argv);

  // execute the action
  try {
    // ...

    // end the process successfully
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
