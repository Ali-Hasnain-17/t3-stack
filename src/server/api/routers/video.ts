import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const videoRouter = createTRPCRouter({
  uploadVideo: protectedProcedure
    .input(z.object({ videoUrl: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const video = await ctx.prisma.video.create({
        data: {
          videoUrl: input.videoUrl,
          userId: ctx.session.user.id,
        },
      });
      return video;
    }),
  getVideoUrl: protectedProcedure
    .input(z.object({ videoId: z.string() }))
    .query(async ({ input, ctx }) => {
      const videoUrl = await ctx.prisma.video.findUnique({
        select: {
          videoUrl: true,
        },
        where: {
          id: input.videoId,
        },
      });
      return videoUrl;
    }),
  addVideoDetails: protectedProcedure
    .input(
      z.object({
        videoId: z.string(),
        title: z.string(),
        description: z.string(),
        thumbnailUrl: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const video = await ctx.prisma.video.update({
        where: {
          id: input.videoId,
        },
        data: {
          thumbnailUrl: input.thumbnailUrl,
          title: input.title,
          description: input.description,
        },
      });
      return video;
    }),
  getAllVideos: publicProcedure.query(async ({ ctx }) => {
    const videos = await ctx.prisma.video.findMany();
    return videos;
  }),
});
