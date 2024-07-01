/* eslint-disable no-console */
import { input } from '@inquirer/prompts';
import { isSrcPathValid, isDestPathValid, generate } from '../../modules/envvar-assets/index.js';

/**
 * Generate Environment Variable Assets
 * Creates the assets based on a source file and places the output in the destination path.
 */
export default async () => {
  // handle user input
  const srcPath = await input({
    message: 'Enter path to the source file (source.json)',
    validate: isSrcPathValid,
  });
  const destPath = await input({
    message: 'Enter path to the destination (empty directory)',
    validate: isDestPathValid,
  });

  // generate the assets
  generate(srcPath, destPath);

  // print the receipt
  console.log('\nSource File:');
  console.log(srcPath);
  console.log('\nOutput:');
  console.log(destPath);
  console.log('  secrets/');
  console.log('  source.json');
  console.log('  .env');
};
