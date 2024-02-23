import { Request, Response } from "express";
import prisma from "../prisma/prisma";
import { hashPassword, passwordCompare } from "../utils/passwordUtils";
import { createJWTAccessToken, payloadOfJWT } from "../utils/jwt";
const signup = async (req: Request, res: Response) => {
  // get data from body
  const user: {
    email: string;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
  } = req.body;
  // test if this user already exists in the database
  const userAlreadyExist = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });
  if (userAlreadyExist) {
    throw new Error("User already exists");
  }
  //   if not  hash the user password
  const hashedPassword = hashPassword(user.password);
  user.password = hashedPassword;
  // create the user
  const newUser = await prisma.user.create({ data: user });
  //   if user created successfully create a token for him
  const payload = payloadOfJWT(newUser);
  const accessToken = createJWTAccessToken(payload);
  res.status(200).json({ data: newUser ,accessToken});
};
const login = async (req: Request, res: Response) => {
  // get data from body
  const user: {
    email: string;
    password: string;
  } = req.body;
  // test if this user already exists in the database
  const userAlreadyExist = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });
  if (!userAlreadyExist) {
    throw new Error("Password or email is not correct");
}
const isPasswordCorrect = await passwordCompare(user.password,userAlreadyExist.password);

if(!isPasswordCorrect){
    throw new Error("Password or email is not correct");
    
  }
  //   if user passed successfully create a token for him
  const payload = payloadOfJWT(userAlreadyExist);
  const accessToken = createJWTAccessToken(payload);
  res.status(200).json({ data: userAlreadyExist ,accessToken});
};

export { signup , login };
