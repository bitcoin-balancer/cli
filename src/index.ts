#! /usr/bin/env node
import process from 'node:process';
import { select, Separator } from '@inquirer/prompts';
import { readPackageFile } from './modules/shared/utils/utils.js';

/* ************************************************************************************************
 *                                              MENU                                              *
 ************************************************************************************************ */
const actionsByCategory = [
  {
    name: 'Host',
    description: 'Run general commands in the remote host',
    value: [
      {
        value: 'connect',
        description: 'Establish a connection with the remote host through the SSH Protocol',
      },
      {
        value: 'landscape-sysinfo',
        description: 'Execute the monitoring tool in the remote host',
      },
      {
        value: 'top',
        description: 'Execute the monitoring tool in the remote host',
      },
      {
        value: 'copy-ssh-public-key',
        description: 'Transfer the local SSH Public Key to the remote host',
      },
      {
        value: 'reboot',
        description: 'Trigger an immediate reboot in the remote host',
      },
      {
        value: 'shutdown',
        description: 'Trigger an immediate shutdown in the remote host',
      },
    ],
  },
  {
    name: 'Docker Compose',
    description: 'Run docker compose commands in the local or remote host',
    value: [
      {
        value: 'up',
        description: '@TODO',
      },
      {
        value: 'up:test-mode',
        description: '@TODO',
      },
      {
        value: 'up:restore-mode',
        description: '@TODO',
      },
      new Separator(),
      {
        value: 'build',
        description: '@TODO',
      },
      {
        value: 'build-up',
        description: '@TODO',
      },
      {
        value: 'build-up:test-mode',
        description: '@TODO',
      },
      {
        value: 'build-up:restore-mode',
        description: '@TODO',
      },
    ],
  },
  {
    name: 'Environment Variables',
    description: 'Generate and deploy environment variables as well as secrets',
    value: [
      {
        value: 'generate-env-vars',
        description: 'Generate the environment variable assets based on a source file',
      },
      {
        value: 'deploy-env-vars',
        description: 'Deploy the environment variable assets to the remote host',
      },
    ],
  },
];





/* ************************************************************************************************
 *                                           EXECUTION                                            *
 ************************************************************************************************ */
(async () => {
  try {
    // print the heading
    const packageFile = readPackageFile();
    console.log(`Balancer CLI v${packageFile.version}\n`);

    // display the categories menu
    const chosenCategory = await select({
      message: 'Select a category',
      choices: actionsByCategory.map((category) => ({
        name: category.name,
        value: category.value,
        description: category.description,
      })),
      pageSize: 100,
      loop: false,
    });

    // display the actions menu
    const chosenAction = await select({
      message: 'Select an action',
      choices: chosenCategory,
      pageSize: 100,
      loop: false,
    });
    console.log(chosenAction);

    // execute the action
    // @TODO

    // end the process successfully
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
