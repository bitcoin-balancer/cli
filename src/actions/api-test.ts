/* eslint-disable no-console */
import { localHostFactory } from '../modules/local-host/index.js';

/**
 * API Test
 * Runs the automated tests on the api service for the chosen variation.
 */
export default async (variation: string | undefined) => {
  if (typeof variation !== 'string') {
    throw new Error('The api-test action requires a variation to be passed.');
  }
  const localHost = localHostFactory();
  const payload = await localHost.apiTest(variation);
  console.log(payload);
};
