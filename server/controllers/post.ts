import { Request, Response, NextFunction } from "express";
import asyncWrapper from "../utils/asyncWrapper";
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
    const post = await prisma.post.create({ data: newPost });
    res.status(201).json({ post });
  }
);

const getAllPosts = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const posts = await prisma.post.findMany();

    res.status(200).json({ totalPosts: posts.length, data: posts });
  }
);
const getSinglePost = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction)  =>{
    const postId = req.params.id;
    const post: Post | null = await prisma.post.findFirst({
      where: { id: postId },
    });
    if (!post) {
       res.status(404).json({ message: "No post with this id" });
    }
    res.status(200).json({ data: post });
  }
);

const getPostsByUser = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const posts: Post[] = await prisma.post.findMany({
      where: { writerId: userId },
    });
    if (!posts.length) {
      res.status(404).json({ message: "No posts By this user" });
    }
    res.status(200).json({ data: posts });
  }
);
const updatePost = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id; // Use optional chaining to safely access nested properties
    if (!userId) {
      return next(new AppError("User not authorized to update", 401));
    }
    const postId = req.params.id;
    const poster = req.file?.filename;
    const postToUpdate: Post = req.body;
    if (req.file) {
      postToUpdate.poster = req.file.filename;
    }

    const post = await prisma.post.findFirst({
      where: {
        id: postId,
        writerId: userId,
      }
    });
    
    if(!post){
        return next(new AppError("User not authorized to update", 401));
    }
    const postUpdate = await prisma.post.update({
        where: {
          id: postId,
        },
        data: postToUpdate,
      });
    res.status(200).json({ postUpdate });
  }
);
const deletePost = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id; // Use optional chaining to safely access nested properties
    if (!userId) {
      return next(new AppError("User not authorized to delete", 401));
    }
    const postId = req.params.id;

    const post = await prisma.post.findFirst({
      where: {
        id: postId,
        writerId: userId,
      }
    });
    
    if(!post){
        res.status(401).json({message:"Not authorized to delete the post"})
    }
    await prisma.$transaction([
      prisma.comment.deleteMany({
        where: {
          postId,
        },
      }),
      prisma.post.delete({
        where: {
          id: postId,
        },
      }),
    ]);
    
    res.status(204).json({ message:"Post deleted successfully" });
  }    
  
);
export { createPost, getAllPosts, getSinglePost, getPostsByUser,updatePost,deletePost };
