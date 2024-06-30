#! /usr/bin/env node
/* eslint-disable no-console */
import process from 'node:process';
import { readPackageFile, decodeMenuAction } from './modules/shared/utils/utils.js';
import { displayMenu } from './modules/menu/menu.js';

(async () => {
  try {
    // print the heading
    const packageFile = readPackageFile();
    console.log(`Balancer CLI v${packageFile.version}\n`);

    // display the actions menu
    const encodedAction = await displayMenu();

    // execute the action
    const { id, variation } = decodeMenuAction(encodedAction);
    const action = await import(`./actions/${id}/index.js`);
    await action.default(variation);

    // end the process successfully
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
