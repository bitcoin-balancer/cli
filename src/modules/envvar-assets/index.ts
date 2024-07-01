import { copyFile, writeTextFile } from 'fs-utils-sync';
import { readSourceFile } from './utils.js';
import { isSrcPathValid, isDestPathValid } from './validations.js';
import { ISourceFile, IKeyValObj } from './types.js';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Processes a source file and generates the environment variables ready to be saved.
 * @param source
 * @returns { env: string, secrets: IKeyValObj[] }
 */
const __processSourceFile = (source: ISourceFile): { env: string, secrets: IKeyValObj[] } => {
  // init values
  let env = '';
  const secrets: IKeyValObj[] = [];

  // iterate over each environment key
  Object.entries(source.environment).forEach(([key, value]) => {
    // process the value so it can be stored
    const processedValue = typeof value === 'object' ? JSON.stringify(value) : String(value);

    // if the property is a secret, do not include the value in the env
    if (source.secrets.includes(key)) {
      env += `${key}=/run/secrets/${key}\n`;
      secrets.push({ key, value: processedValue });
    } else {
      env += `${key}=${processedValue}\n`;
    }
  });

  // finally, return the processed data
  return { env, secrets };
};


/**
 * Generates the environment variable assets based on a source file.
 * @param srcPath
 * @param destPath
 */
const generate = (srcPath: string, destPath: string): void => {
  // read the source file
  const source = readSourceFile(srcPath); console.log(source);

  // process the file
  const { env, secrets } = __processSourceFile(source);

  // save the .env file
  writeTextFile(`${destPath}/.env`, env);

  // save the secrets
  secrets.forEach((secret) => writeTextFile(`${destPath}/secrets/${secret.key}.txt`, secret.value));

  // copy the source file
  copyFile(srcPath, `${destPath}/source.json`);
};




/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // validations
  isSrcPathValid,
  isDestPathValid,

  // implementation
  generate,
};
