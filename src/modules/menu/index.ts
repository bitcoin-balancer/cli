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
        value: 'up:restore-mode',
        description: 'Creates and starts the containers in RESTORE_MODE',
      },
      new Separator(),
      {
        value: 'build-up',
        description: 'Builds all the images and starts the containers',
      },
      {
        value: 'build-up:restore-mode',
        description: 'Builds all the images and starts the containers in RESTORE_MODE',
      },
      new Separator(),
      {
        value: 'prune-build-push',
        description:
          'Removes all unused containers, networks and images (both dangling and unused). Then, it builds all the images and pushes them to the registry (Docker Hub)',
      },
      new Separator(),
      {
        value: 'down',
        description:
          'Stops containers and removes containers, networks, volumes, and images created by up',
      },
      {
        value: 'down-build-up',
        description:
          'Stops containers and removes containers, networks, volumes, and images created by up. Afterwards, it builds all the images and starts the containers',
      },
      {
        value: 'restart',
        description: 'Restarts all stopped and running services',
      },
      new Separator(),
      {
        value: 'logs',
        description: 'Displays log output from all services',
      },
      {
        value: 'logs:postgres',
        description: 'Displays log output from the postgres service',
      },
      {
        value: 'logs:api',
        description: 'Displays log output from the api service',
      },
      {
        value: 'logs:gui',
        description: 'Displays log output from the gui service',
      },
      {
        value: 'logs:ct',
        description: 'Displays log output from the ct service',
      },
      new Separator(),
      {
        value: 'prune',
        description: 'Remove all unused containers, networks and images (both dangling and unused)',
      },
    ],
  },
  {
    name: 'Docker Compose Tests',
    description: 'Run docker compose commands for automated tests',
    value: [
      {
        value: 'up:test-mode',
        description: 'Creates and starts the containers in TEST_MODE',
      },
      new Separator(),
      {
        value: 'build-up:test-mode',
        description: 'Builds all the images and starts the containers in TEST_MODE',
      },
      new Separator(),
      {
        value: 'down',
        description:
          'Stops containers and removes containers, networks, volumes, and images created by up',
      },
      {
        value: 'down-build-up:test-mode',
        description:
          'Stops containers and removes containers, networks, volumes, and images created by up. Afterwards, it builds all the images and starts the containers in TEST_MODE',
      },
      new Separator(),
      {
        value: 'api-test:integration',
        description: 'Runs the integration tests in the api service',
      },
      {
        value: 'api-test:unit',
        description: 'Runs the unit tests in the api service',
      },
      {
        value: 'api-test:bench',
        description: 'Runs the benchmarks in the api service',
      },
    ],
  },
  {
    name: 'CLI Management',
    description: 'Build and deploy the CLI Program',
    value: [
      {
        value: 'build-cli',
        description: 'Builds the CLI from the source code',
      },
      {
        value: 'build-deploy-cli',
        description: "Builds and deploys the CLI's source code to the remote host",
      },
    ],
  },
  {
    name: 'Database Management',
    description: 'Monitor and manage the database',
    value: [
      {
        value: 'psql',
        description: 'Start the terminal-based front-end to PostgreSQL',
      },
      {
        value: 'backup-db',
        description: 'Takes a snapshot of the database and generates a backup file',
      },
      {
        value: 'restore-db',
        description: 'Cleans the current database and restores a backup file',
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
export { displayMenu };
