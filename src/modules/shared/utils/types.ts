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
 * Remote Host Config
 * The configuration that will be used to connect to and interact with the remote host.
 */
const RemoteHostConfigSchema = z.object({
  // the absolute path to the CLI's source code
  cli: z.string(),

  // the absolute path to the SSH Private Key
  sshPrivateKey: z.string(),

  // the details required to interact with the remote host
  server: z.object({
    name: z.string(),
    ip: z.string(),
  }),

  // the list of assets that will be deployed to the remote host
  sourceCode: z.array(z.string()),
});
type IRemoteHostConfig = z.infer<typeof RemoteHostConfigSchema>;



/**
 * Decoded Menu Action
 * The menu displays encoded actions to simplify the choosing process. The actions need to be
 * decoded into id and variation so they can be properly interacted with.
 */
type IDecodedMenuAction = {
  // the id of the action that will be executed
  id: string,

  // optional variation of an action
  variation?: string,
};





/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export {
  PackageFileSchema,
  type IPackageFile,
  RemoteHostConfigSchema,
  type IRemoteHostConfig,
  type IDecodedMenuAction,
};
