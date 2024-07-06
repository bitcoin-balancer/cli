/* eslint-disable no-console */
import { selectHost } from '../../modules/shared/input-utils/index.js';

/**
 * Down
 * Stops containers and removes containers, networks, volumes, and images created by up.
 */
export default async () => {
  // select the host
  const host = await selectHost();

  // execute the action
  const payload: string | undefined = await host.down();

  // print the payload
  console.log(payload);
};
