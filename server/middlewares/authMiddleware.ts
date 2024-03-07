import { AppError } from "../errors/errorClass";
import asyncWrapper from "../utils/asyncWrapper";
import { Request, Response, NextFunction } from "express";
import { verifyAcconut } from "../utils/jwt";
import prisma from "../prisma/prisma";


const protect = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return next(new AppError("Not authorized No token provided", 401));
    }
    const decode = verifyAcconut(token)
    const userValid = await prisma.user.findUnique({
        where:{
            id:decode
        }
    })
    if (!userValid) {
      return next(new AppError("Not authorized No token provided", 401));
    }
    req.user = userValid;
    next ();
  }
);
export default protect
