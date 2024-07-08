/* eslint-disable no-console */
import { input } from '@inquirer/prompts';
import { isDatabaseBackupSrcPathValid, remoteHostFactory } from '../modules/remote-host/index.js';

/**
 * Restore Database
 * Restores a chosen backup file after cleaning the current state of the database and performs a
 * clean up once complete.
 */
export default async () => {
  // instantiate the remote host
  const host = await remoteHostFactory();

  // prompt the user to input the backup file's path
  const srcPath = await input({
    message: 'Enter the path of the backup file you wish to restore ($timestamp.dump)',
    validate: isDatabaseBackupSrcPathValid,
  });

  // perform the action
  const payload = await host.restoreDatabaseBackup(srcPath);
  console.log(payload);
};
