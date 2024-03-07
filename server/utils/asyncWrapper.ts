import { Request, Response, NextFunction } from 'express';

type AsyncMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction 
) => Promise<void>;

const asyncWrapper =  function (cb: AsyncMiddleware) {
  return  async (req: Request, res: Response, next: NextFunction) => {
   try {
    await cb(req,res,next);
   } catch (error) {
    next(error);
    
   }
  };
};

export default asyncWrapper;