/* eslint-disable no-console */
import { localHostFactory } from '../modules/local-host/index.js';

/**
 * Prune Build Push
 * Removes all unused containers, networks and images (both dangling and unused). Then, it builds
 * all the images and pushes them to the registry (Docker Hub).
 */
export default async () => {
  const host = localHostFactory();
  const payload = await host.buildAndPushImages();
  console.log(payload);
};
