import asyncWrapper from "../utils/asyncWrapper";
import { Request, Response, NextFunction } from "express";
import prisma from "../prisma/prisma";
import { AppError } from "../errors/errorClass";
const getAllUsers = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await prisma.user.findMany();
    if (!users) {
      return next(new AppError("No users currently", 400));
    }
    res.status(200).json({ totalUsers: users.length, data: users });
  }
);
const getUser = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return next(new AppError("No user With id " + userId, 400));
    }
    res.status(200).json({ data: user });
  }
);
const deleteUser = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;
    if (!userId) {
      return next(new AppError("User not authorized to delete", 401));
    }
    const userValid = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!userValid) {
      return next(new AppError("No user With id " + userId, 400));
    }
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    res.status(200).json({ msg: "User deleted successfully" });
  }
);
// const  updateUser = asyncWrapper((req:Request,res:Response,next:NextFunction)=>{
// })
const uploadImage = asyncWrapper(
  async(req: Request, res: Response, next: NextFunction) => {}
);
export { deleteUser, getAllUsers, getUser };
