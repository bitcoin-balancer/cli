/* eslint-disable no-console */
import { localHostFactory } from '../modules/local-host/index.js';

/**
 * Build Push
 * Builds all the images and pushes them to the registry (Docker Hub).
 */
export default async () => {
  const host = localHostFactory();
  const payload = await host.buildAndPushImages();
  console.log(payload);
};
