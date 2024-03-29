import dotenv  from 'dotenv';
dotenv.config();
import express, { Express, Request, Response } from "express";
const PORT = process.env.PORT;
// ======================================
// routes import 
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import postRouter from "./routes/post";
import commentRouter from "./routes/comment";
import categoryRouter from "./routes/category";
import likeRouter from "./routes/like";
import { User } from '@prisma/client';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware';
// ======================================
const app: Express = express();
app.use(express.json());
// global declaration of user for using userId
declare global {
  namespace Express {
    interface Request {
      user:User
    }
  }
}
app.use("/api/v1/auth",authRouter);
app.use("/api/v1/users",userRouter);
app.use("/api/v1/posts",postRouter);
app.use("/api/v1/categories",categoryRouter);
app.use("/api/v1/comments",commentRouter);
app.use("/api/v1/likes",likeRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Ts is here now");
});
app.use(errorHandlerMiddleware)
app.listen(PORT, () => {
  console.log("server is listening on port " + PORT);
});
