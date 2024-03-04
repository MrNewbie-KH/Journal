import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/prisma";
import { hashPassword, passwordCompare } from "../utils/passwordUtils";
import { createJWTAccessToken } from "../utils/jwt";
import asyncWrapper from "../utils/asyncWrapper";
import { User } from "@prisma/client";
import { AppError } from "../errors/errorClass";
import { validateLogin, validateSignup } from "../validation/authValidation";
const signup = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    // get data from body
    const user: {
      nothing:string,clear
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    } = req.body;
    const { error } = validateSignup(user);
    if (error) {
      return next(new AppError(error.details[0].message, 400));
    }
    // test if this user already exists in the database
    const userAlreadyExist: User | null = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });
    if (userAlreadyExist) {
      return next(new AppError("This user already exists", 400));
    }
    //   if not  hash the user password
    const hashedPassword = hashPassword(user.password);
    user.password = hashedPassword;
    // create the user
    const newUser: User = await prisma.user.create({ data: user });
    // send email ti him to verify he is the one
    const accessToken = createJWTAccessToken(newUser);
    res.status(200).json({ data: newUser, accessToken });
  }
);
const login = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction) => {
    // get data from body
    const user: {
      email: string;
      password: string;
    } = req.body;
    const { error } = validateLogin(user);
    if (error) {
      return next(new AppError(error.details[0].message, 400));
    }
    // test if this user already exists in the database
    const userAlreadyExist: User | null = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });
    if (!userAlreadyExist) {
      return next(new AppError("Password or email is not correct", 400));
    }
    const isPasswordCorrect = await passwordCompare(
      user.password,
      userAlreadyExist.password
    );

    if (!isPasswordCorrect) {
      throw new Error("Password or email is not correct");
    }
    //   if user passed successfully create a token for him
    const accessToken = createJWTAccessToken(userAlreadyExist);
    res.status(200).json({ data: userAlreadyExist, accessToken });
  }
);

export { signup, login };
