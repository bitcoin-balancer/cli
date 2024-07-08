/* eslint-disable no-console */
import { input } from '@inquirer/prompts';
import { isDatabaseBackupDestPathValid, remoteHostFactory } from '../modules/remote-host/index.js';

/**
 * Backup Database
 * Generates a database backup file, pulls it to the local host and performs a clean up once
 * complete.
 */
export default async () => {
  // instantiate the remote host
  const host = await remoteHostFactory();

  // prompt the user to input the destination path for the backup file
  const destPath = await input({
    message: 'Enter the destination path for the backup file (local host directory)',
    validate: isDatabaseBackupDestPathValid,
  });

  // perform the action
  const payload = await host.generateDatabaseBackup(destPath);
  console.log(payload);
};
