import Joi from "joi";
const validateSignup = (signup: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  // create the chema
  const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(20).required(),
    firstName: Joi.string().min(1).max(20).required(),
    lastName: Joi.string().min(1).max(20).required(),
  });
  return signupSchema.validate(signup);
};
const validateLogin = (login: { email: string; password: string }) => {
  // create the chema
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return loginSchema.validate(login);
};
export { validateSignup,validateLogin };
