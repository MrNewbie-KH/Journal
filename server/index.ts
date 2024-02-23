import dotenv  from 'dotenv';
dotenv.config();
import express, { Express, Request, Response } from "express";
const PORT = process.env.PORT;
// ======================================
// routes import 
import authRouter from "./routes/auth";
// ======================================
const app: Express = express();
app.use(express.json());

app.use("/api/v1/auth",authRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Ts is here now");
});
app.listen(PORT, () => {
  console.log("server is listening on port " + PORT);
});
