/* eslint-disable no-console */
import { selectHost } from '../modules/shared/input-utils/index.js';

/**
 * psql
 * Initializes a psql session in the postgres container.
 */
export default async () => {
  const host = await selectHost();
  const payload: string | undefined = await host.psql();
  console.log(payload);
};
