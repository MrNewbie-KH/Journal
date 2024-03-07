import { Request, Response, NextFunction } from "express";
import asyncWrapper from "../utils/asyncWrapper";
import prisma from "../prisma/prisma";
import { AppError } from "../errors/errorClass";
import { Comment } from "@prisma/client";
const createComment = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId: string = req.params.id;
    const userId: string = req.user.id;
    const comment: Comment = req.body;
    // check if this post is available
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });
    if (!post) {
      return next(new AppError("No post with this ID" + postId, 404));
    }
    comment.userId = userId;
    comment.postId = postId;
    const newComment = await prisma.comment.create({ data: comment });
    res.status(200).json({ comment: newComment });
  }
);
const getAllCommentsOnPost = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const postId: string = req.params.id;
    // check if this post is available
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });
    if (!post) {
      return next(new AppError("No post with this ID" + postId, 404));
    }

    const comments = await prisma.comment.findMany({
      where: { postId },
      //   select: {
      //     id: true,
      //     content: true,
      // post:{
      //     select:{
      //         title:true,
      //         content:true
      //     }
      // }
      //   },
    });
    res.status(200).json({ totalComments: comments.length, comments });
  }
);
const getSingleComment = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const commentId: string = req.params.id;

    const comment = await prisma.comment.findFirst({
      where: { id: commentId },
      select: {
        content: true,
        post: {
          select: {
            title: true,
          },
        },
      },
    });
    if (!comment) {
      return next(new AppError("No comment with this ID" + commentId, 404));
    }
    res.status(200).json({ comment });
  }
);
const updateComment = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const commentId: string = req.params.id;
    const updates: Comment = req.body;
    const comment = await prisma.comment.update({
      where: { id: commentId },
      data: updates,
    });

    if (!comment) {
      return next(new AppError("No comment with this ID" + commentId, 404));
    }
    res.status(200).json({ comment });
  }
);
const deleteComment = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const commentId: string = req.params.id;
    const comment = await prisma.comment.delete({
      where: { id: commentId },
    });

    if (!comment) {
      return next(new AppError("No comment with this ID" + commentId, 404));
    }
    res.status(201).json({ message: "comment deleted", comment });
  }
);
export {
  createComment,
  getAllCommentsOnPost,
  getSingleComment,
  updateComment,
  deleteComment,
};
