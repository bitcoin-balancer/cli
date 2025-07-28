import { z } from 'zod';

/* ************************************************************************************************
 *                                             TYPES                                              *
 ************************************************************************************************ */

/**
 * Source File
 * The object that is used in order to generate the environment variable assets. Keep in mind that
 * sensitive data is extracted from the environment data and placed in to the /secrets directory.
 * For more information visit:
 * - https://docs.docker.com/compose/use-secrets/
 * - https://www.notion.so/jesusgraterol/compose-yaml-Templates-56ebe4aaaa8d4cd08d1bcb4eed22cb1a?pvs=4
 */
const SourceFileSchema = z
  .object({
    // the data that will be used to generate the environment variable assets
    environment: z.record(
      z.string(),
      z.union([
        z.string(),
        z.number(),
        z.boolean(),
        z.record(z.string(), z.any()),
        z.array(z.any()),
      ]),
    ),

    // the list of keys with secret data that will be hidden from the raw environment variables
    secrets: z.array(z.string()),
  })
  .strict();
type ISourceFile = z.infer<typeof SourceFileSchema>;

// Key Value Type Helper
type IKeyValObj = {
  key: string;
  value: string;
};

/* ************************************************************************************************
 *                                         MODULE EXPORTS                                         *
 ************************************************************************************************ */
export { SourceFileSchema, type ISourceFile, type IKeyValObj };
