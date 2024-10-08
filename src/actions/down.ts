/* eslint-disable no-console */
import { selectHost } from '../modules/shared/input-utils/index.js';

/**
 * Down
 * Stops containers and removes containers, networks, volumes, and images created by up.
 */
export default async () => {
  const host = await selectHost();
  const payload: string | undefined = await host.down();
  console.log(payload);
};
