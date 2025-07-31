import bcryptjs from 'bcryptjs';
import envVars from '../config/env';

const hashedPassword = async (password: string) => {
  return await bcryptjs.hash(password, envVars.BCRYPT_SALT_ROUND);
};

export default hashedPassword;
