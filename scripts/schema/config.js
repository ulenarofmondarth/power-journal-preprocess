import { z } from 'zod/v4';

export const config = z.object({
  docbuild: z.object({
    image: z.object({
      registry: z.string(),
      name: z.string(),
      version: z.string(),
    }),
    volumes: z.array(
      z.object({
        internal: z.string(),
        external: z.string(),
      }),
    ),
    name: z.string(),
  }),
  docserve: z.object({
    image: z.object({
      registry: z.string(),
      name: z.string(),
      version: z.string(),
    }),
    ports: z.array(
      z.object({
        internal: z.int32(),
        external: z.int32(),
      }),
    ),
    volumes: z.array(
      z.object({
        internal: z.string(),
        external: z.string(),
      }),
    ),
    name: z.string(),
  }),
});
