import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/prisma";
import { hashPassword, passwordCompare } from "../utils/passwordUtils";
import { createJWTAccessToken, payloadOfJWT } from "../utils/jwt";
import asyncWrapper from "../utils/asyncWrapper";
import { User } from "@prisma/client";
import { AppError } from "../errors/errorClass";
import {validateLogin, validateSignup} from "../validation/authValidation"
const signup = asyncWrapper(async (req: Request, res: Response,next:NextFunction) => {
  // get data from body
  const user: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  } = req.body;
  const valid= validateSignup(user);
  if(valid.error){
  return next(new AppError("All data fields must be provided",400))

}
  // test if this user already exists in the database
  const userAlreadyExist: User | null = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });
  if (userAlreadyExist) {
    return next(new AppError("This user already exists",400))
  }
  //   if not  hash the user password
  const hashedPassword = hashPassword(user.password);
  user.password = hashedPassword;
  // create the user
  const newUser: User = await prisma.user.create({ data: user });
  const payload = payloadOfJWT(newUser);
  // send email ti him to verify he is the one 
  const accessToken = createJWTAccessToken(payload);
  res.status(200).json({ data: newUser, accessToken });
});
const login = async (req: Request, res: Response,next:NextFunction) => {
  // get data from body
  const user: {
    email: string;
    password: string;
  } = req.body;
  const valid = validateLogin(user);
  if(valid.error){
    return next(new AppError("All data fields must be provided",400))
  }
  // test if this user already exists in the database
  const userAlreadyExist: User | null = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });
  if (!userAlreadyExist) {
    return next(new AppError("Password or email is not correct",400))
  }
  const isPasswordCorrect = await passwordCompare(
    user.password,
    userAlreadyExist.password
  );

  if (!isPasswordCorrect) {
    throw new Error("Password or email is not correct");
  }
  //   if user passed successfully create a token for him
  const payload = payloadOfJWT(userAlreadyExist);
  const accessToken = createJWTAccessToken(payload);
  res.status(200).json({ data: userAlreadyExist, accessToken });
};

export { signup, login };
