import { User } from "@prisma/client";
import { Payload } from "@prisma/client/runtime/library";
import jwt from "jsonwebtoken";

const createJWTAccessToken = function (user: User) {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    console.log("No secret in the env");

    process.exit(1);
  }
  const token = jwt.sign(user.id, process.env.ACCESS_TOKEN_SECRET);
  return token;
};
const verifyAcconut = function (token: string): Payload<string> {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    console.log("No secret in the env");

    process.exit(1);
  }
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
  return decoded;
};
export { createJWTAccessToken, verifyAcconut };
