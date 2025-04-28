import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface JwtCustomPayload {
  userId: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: JwtCustomPayload | JwtPayload
}

