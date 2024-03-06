import { Request, Response, NextFunction } from "express";
import asyncWrapper from "../utils/asyncWrapper";
import { User } from "@prisma/client";
import { AppError } from "../errors/errorClass";
import prisma from "../prisma/prisma";
import { Post } from "@prisma/client";

const createPost = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id; // Use optional chaining to safely access nested properties
    if (!userId) {
      return next(new AppError("User not authorized to delete", 401));
    }
    const poster = req.file?.filename;
    const newPost: {
      content: string;
      title: string;
      writerId: string;
      poster?: string;
    } = req.body;

    newPost.poster = poster;
    newPost.writerId = userId;

    try {
      const post = await prisma.post.create({ data: newPost });
      res.status(201).json({ post });
    } catch (error) {
      next(error);
    }
  }
);

const getAllPosts = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await prisma.post.findMany();

    res.status(200).json({ totalPosts: posts.length, data: posts });
  }
);
const getSinglePost = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {}
);
const getPostsByUser = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {}
);
const updatePost = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {}
);
const deletePost = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {}
);
export { createPost, getAllPosts };
