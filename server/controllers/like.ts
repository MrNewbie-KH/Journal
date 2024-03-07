import { Request, Response, NextFunction } from "express";
import asyncWrapper from "../utils/asyncWrapper";
import prisma from "../prisma/prisma";
import { AppError } from "../errors/errorClass";
const toggleLike = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.user.id;
    const postId: string = req.params.id;
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post) new AppError("No post to add like", 404);
    const alreadyLiked = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });
    if (alreadyLiked) {
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
      res.status(204).json({ message: " like deleted from post" });
    } else {
      await prisma.like.create({ data: { postId, userId } });
      res.status(200).json({ message: "New like added to post" });
    }
  }
);

const getAllLikes = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId: string = req.params.id;
    const likes = await prisma.like.findMany({
      where: {
        postId,
      },
    });
    if (!likes) new AppError("No Likes to this Post", 404);

    res.status(200).json({ LikesNumber: likes.length, likes });
  }
);
export { toggleLike, getAllLikes };
