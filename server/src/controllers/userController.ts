import userService from "../services/userService";
import { Request, Response } from "express";
import StatusCode from "../utils/status-codes";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!

async function login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
        const user = await userService.login({ email, password });
        if(!user) {
            res.status(StatusCode.UNAUTHORIZED).json({
                success: false,
                data: {},
                message: "Invalid email or password"
            });
        }
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        res.status(StatusCode.SUCCESS).json({
            success: true,
            data: user,
            message: "Login successful"
        })
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            data: {},
            message: "Internal server error"
        })
    }
}

async function signup(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;
    try {
        const user = await userService.signup({ name, email, password });
        if(!user) {
            res.status(StatusCode.BAD_REQUEST).json({
                success: false,
                data: {},
                message: "User already exists"
            });
        }
        res.status(StatusCode.CREATED).json({
            success: true,
            data: user,
            message: "User created successfully"
        })
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            data: {},
            message: "Internal server error"
        })
    }
}

async function getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
        const user = await userService.getUserById(id);
        if(!user) {
            res.status(StatusCode.NOT_FOUND).json({
                success: false,
                data: {},
                message: "User not found"
            });
        }
        res.status(StatusCode.SUCCESS).json({
            success: true,
            data: user,
            message: "User retrieved successfully"
        })
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            data: {},
            message: "Internal server error"
        })
    }
}

export default {
    login,
    signup,
    getUserById
}