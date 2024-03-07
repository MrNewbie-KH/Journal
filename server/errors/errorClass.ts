export class AppError extends Error {
    public status: string;  // status can be success fail error
    public isOperational: boolean;
    constructor(message: string, public statusCode: number) {
      super(message);
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  export const createError = (message: string, statusCode: number) => {
    return new AppError(message, statusCode);
  };