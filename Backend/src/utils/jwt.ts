import jwt, { JwtPayload } from 'jsonwebtoken';

export const generateToken = (payload: { userId: string, role: string }): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' });
};

export const verifyToken = (token: string): JwtPayload | string => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};
