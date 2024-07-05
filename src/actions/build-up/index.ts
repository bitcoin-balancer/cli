import { generate } from '../../modules/compose-file/index.js';


/**
 * Build Up
 * Builds all the images and starts the containers. If the variation is provided, it starts the
 * containers in a chosen mode.
 */
export default async (variation: string | undefined) => {
  generate({ testMode: false, restoreMode: false });
  if (variation === undefined) {
    // ...
  } else if (variation === 'test-mode') {
    // ...
  } else {
    // remote-host
  }
};
