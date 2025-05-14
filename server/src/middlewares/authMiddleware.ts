import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import StatusCode from "../utils/status-codes";

const JWT_SECRET = process.env.JWT_SECRET!;

interface AuthRequest extends Request {
  user?: any;
}

export default function authenticateUser(req: AuthRequest, res: Response, next: NextFunction): Promise<any> {
    const token = req.cookies.access_token;
    if (!token) {
        res.status(StatusCode.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized: No token provided",
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(StatusCode.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized: Invalid or expired token",
        });
    }
    return Promise.resolve();
}
