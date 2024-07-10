import { z } from 'zod';

/* ************************************************************************************************
 *                                          PACKAGE FILE                                          *
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





/* ************************************************************************************************
 *                                              HOST                                              *
 ************************************************************************************************ */

/**
 * Remote Server Config
 * The configuration required to interact with a remote host.
 */
const RemoteHostServerConfigSchema = z.object({
  name: z.string(),
  ip: z.string(),
});
type IRemoteHostServerConfig = z.infer<typeof RemoteHostServerConfigSchema>;

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
  server: RemoteHostServerConfigSchema,

  // the list of assets that will be deployed to the remote host
  sourceCode: z.array(z.string()),
});
type IRemoteHostConfig = z.infer<typeof RemoteHostConfigSchema>;





/* ************************************************************************************************
 *                                      ENVIRONMENT VARIABLES                                     *
 ************************************************************************************************ */

/**
 * Environment Variable Insights
 * General data regarding the environment variable assets that are needed to build the compose file.
 */
type IEnvironmentVariableInsights = {
  // true if NODE_ENV === 'production'
  isProduction: boolean;

  // true if TUNNEL_TOKEN === '/run/secrets/TUNNEL_TOKEN'
  hasTunnelToken: boolean;

  // the list of secrets located in the 'secrets' directory
  secrets: string[];
};





/* ************************************************************************************************
 *                                              MENU                                              *
 ************************************************************************************************ */

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
  // package file
  PackageFileSchema,
  type IPackageFile,

  // host
  RemoteHostServerConfigSchema,
  type IRemoteHostServerConfig,
  RemoteHostConfigSchema,
  type IRemoteHostConfig,

  // environment variables
  IEnvironmentVariableInsights,

  // menu
  type IDecodedMenuAction,
};
