/* eslint-disable no-console */
import { selectHost } from '../modules/shared/input-utils/index.js';

/**
 * Prune
 * Removes all unused containers, networks and images (both dangling and unused).
 */
export default async () => {
  const host = await selectHost();
  const payload: string | undefined = await host.prune();
  console.log(payload);
};
