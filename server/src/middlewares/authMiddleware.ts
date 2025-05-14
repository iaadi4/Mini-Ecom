import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import StatusCode from "../utils/statusCodes";

const JWT_SECRET = process.env.JWT_SECRET!;

interface AuthRequest extends Request {
  user?: { userId: string };
}

export default function authenticateUser(req: AuthRequest, res: Response, next: NextFunction): void {
  const token = req.cookies.access_token;
  if (!token) {
    res.status(StatusCode.UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized: No token provided",
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    res.status(StatusCode.UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
    });
  }
}
