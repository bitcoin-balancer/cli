import { z } from 'zod';

/* ************************************************************************************************
 *                                             TYPES                                              *
 ************************************************************************************************ */

/**
 * Package File
 * When the CLI is initialized, it loads the package.json file and keeps its contents in memory.
 */
const PackageFileSchema = z.object({
  name: z.string(),
  description: z.string(),
  private: z.boolean(),
  version: z.string(),
  type: z.string(),
  main: z.string(),
  scripts: z.record(z.string(), z.string()),
  repository: z.record(z.string(), z.string()),
  keywords: z.array(z.string()),
  author: z.string(),
  license: z.string(),
  bugs: z.record(z.string(), z.string()),
  homepage: z.string(),
  devDependencies: z.record(z.string(), z.string()),
  dependencies: z.record(z.string(), z.string()),
});
type IPackageFile = z.infer<typeof PackageFileSchema>;

/**
 * Decoded Menu Action
 * The menu displays encoded actions to simplify the choosing process. The actions need to be
 * decoded into id and variation so they can be properly interacted with.
 */
type IDecodedMenuAction = {
  // the id of the action that will be executed
  id: string,

  // optional variation of a action
  variation?: string,
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  // types
  PackageFileSchema,
  type IPackageFile,
  type IDecodedMenuAction,
};
