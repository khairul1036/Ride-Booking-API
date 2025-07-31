import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import envVars from '../config/env';

const generateToken = (payload: JwtPayload, expiresIn: string): string => {

  if (!envVars.JWT.JWT_ACCESS_SECRET) {
    throw new Error('JWT Access Secret is not defined in environment variables');
  }

  const token = jwt.sign(payload, envVars.JWT.JWT_ACCESS_SECRET, {
    expiresIn,
  } as SignOptions);
  return token;
};

const verifyToken = (token: string) => {
  const verifyToken = jwt.verify(token, envVars.JWT.JWT_ACCESS_SECRET);
  return verifyToken;
};

export { generateToken, verifyToken };
