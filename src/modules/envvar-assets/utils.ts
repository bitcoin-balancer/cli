import { readJSONFile } from 'fs-utils-sync';
import { SourceFileSchema, ISourceFile } from './types.js';

/* ************************************************************************************************
 *                                         IMPLEMENTATION                                         *
 ************************************************************************************************ */

/**
 * Reads the source file and returns its parsed contents.
 * @param src
 * @returns ISourceFile
 */
const readSourceFile = (src: string): ISourceFile => SourceFileSchema.parse(readJSONFile(src));





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  readSourceFile,
};
