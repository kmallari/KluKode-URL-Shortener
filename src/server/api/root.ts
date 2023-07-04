import { exampleRouter } from "@/server/api/routers/example";
import { linkRouter } from "@/server/api/routers/link.api";
import { createTRPCRouter } from "@/server/api/trpc";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  link: linkRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
