import bcrypt from "bcryptjs";

// hashing password and return the new password
const hashPassword = function (oldPassword: string): string {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(oldPassword, salt);
  return hash;
};
// compare password here in case of login
const passwordCompare = async function (
  input: string,
  password: string
): Promise<boolean> {
  const isEqual = await bcrypt.compare(input, password);
  return isEqual;
};
export { hashPassword, passwordCompare };
