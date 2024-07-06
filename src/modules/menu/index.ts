import { select, Separator } from '@inquirer/prompts';

/* ************************************************************************************************
 *                                           CONSTANTS                                            *
 ************************************************************************************************ */
const MENU = [
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
        value: 'reboot',
        description: 'Trigger an immediate reboot in the remote host',
      },
      {
        value: 'shutdown',
        description: 'Trigger an immediate shutdown in the remote host',
      },
      {
        value: 'ssh-copy-id',
        description: 'Transfer the local SSH Public Key to the remote host',
      },
    ],
  },
  {
    name: 'Docker Compose',
    description: 'Run docker compose commands in the local or remote host',
    value: [
      {
        value: 'up',
        description: 'Creates and starts the containers',
      },
      {
        value: 'up:test-mode',
        description: 'Creates and starts the containers in TEST_MODE',
      },
      {
        value: 'up:restore-mode',
        description: 'Creates and starts the containers in RESTORE_MODE',
      },
      new Separator(),
      {
        value: 'build-up',
        description: 'Builds all the images and starts the containers',
      },
      {
        value: 'build-up:test-mode',
        description: 'Builds all the images and starts the containers in TEST_MODE',
      },
      {
        value: 'build-up:restore-mode',
        description: 'Builds all the images and starts the containers in RESTORE_MODE',
      },
      {
        value: 'build-push',
        description: 'Builds all the images and pushes them to the registry (Docker Hub)',
      },
      new Separator(),
      {
        value: 'down',
        description: 'Stops containers and removes containers, networks, volumes, and images created by up',
      },
      {
        value: 'restart',
        description: 'Restarts all stopped and running services',
      },
    ],
  },
  {
    name: 'CLI Management',
    description: 'Generate and deploy environment variable assets',
    value: [
      {
        value: 'build-cli',
        description: 'Builds the CLI from the source code',
      },
      {
        value: 'build-deploy-cli',
        description: 'Builds and deploys the CLI\'s source code to the remote host',
      },
    ],
  },
  {
    name: 'Environment Variable Assets',
    description: 'Generate and deploy environment variable assets',
    value: [
      {
        value: 'generate-envvar-assets',
        description: 'Generate the environment variable assets based on a source file',
      },
      {
        value: 'deploy-envvar-assets',
        description: 'Deploy the environment variable assets to the remote host',
      },
    ],
  },
];




/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Displays the CLI menu and returns the chosen, encoded action.
 * @returns Promise<string>
 */
const displayMenu = async (): Promise<string> => {
  // display the categories menu
  const chosenCategory = await select({
    message: 'Select a category',
    choices: MENU,
    pageSize: 100,
    loop: false,
  });

  // display the actions menu and return the choice
  return select({
    message: 'Select an action',
    choices: chosenCategory,
    pageSize: 100,
    loop: false,
  });
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  displayMenu,
};
