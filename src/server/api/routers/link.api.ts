import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

const generateShortUrl = () => Math.random().toString(36).substring(2, 8);

export const linkRouter = createTRPCRouter({
  getUrlFromAccessor: publicProcedure
    .input(z.object({ accessor: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      try {
        const { accessor } = input;
        const link = await ctx.prisma.link.findFirst({
          where: {
            accessor,
          },
        });
        if (!link) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Link not found.",
          });
        }
        return {
          status: {
            ok: true,
            statusCode: 200,
          },
          details: {
            link,
          },
        };
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Getting link failed.",
        });
      }
    }),

  getUserLinks: protectedProcedure.query(async ({ ctx }) => {
    try {
      const links = await ctx.prisma.link.findMany({
        where: {
          userId: ctx.session.user.id,
        },
      });
      return {
        status: {
          ok: true,
          statusCode: 200,
        },
        details: {
          links,
        },
      };
    } catch (error) {
      console.log(error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Getting links failed.",
      });
    }
  }),

  createUserLink: protectedProcedure
    .input(
      z.object({
        url: z.string().url().min(1),
        shortUrl: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { url, shortUrl } = input;
        console.log({ url, shortUrl });
        let accessor = "";
        if (!shortUrl) {
          accessor = generateShortUrl();
        } else accessor = shortUrl;

        const link = await ctx.prisma.link.create({
          data: {
            url,
            accessor,
            userId: ctx.session.user.id,
          },
        });
        return {
          status: {
            ok: true,
            statusCode: 200,
          },
          details: {
            link,
          },
        };
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Creating link failed.",
        });
      }
    }),

  deleteLink: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { id } = input;
        const link = await ctx.prisma.link.delete({
          where: {
            id,
          },
        });
        return {
          status: {
            ok: true,
            statusCode: 200,
          },
          details: {
            link,
          },
        };
      } catch (error) {
        console.log(error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Deleting link failed.",
        });
      }
    }),
});
