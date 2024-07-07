/* eslint-disable no-console */
import { selectHost } from '../modules/shared/input-utils/index.js';

/**
 * Restart
 * Restarts all stopped and running services
 */
export default async () => {
  const host = await selectHost();
  const payload = await host.restart();
  console.log(payload);
};
