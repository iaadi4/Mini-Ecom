import userService from "../services/user-service";
import { Request, Response } from "express";
import StatusCode from "../utils/status-codes";


async function login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
        const user = await userService.login({ email, password });
        if(!user) {
            return res.status(StatusCode.UNAUTHORIZED).json({
                success: false,
                data: {},
                message: "Invalid email or password"
            });
        }
        return res.status(StatusCode.SUCCESS).json({
            success: true,
            data: user,
            message: "Login successful"
        })
    } catch (error) {
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            data: {},
            message: "Internal server error"
        })
    }
}

async function signup(req: Request, res: Response) {
    const { name, email, password } = req.body;
    try {
        const user = await userService.signup({ name, email, password });
        if(!user) {
            return res.status(StatusCode.BAD_REQUEST).json({
                success: false,
                data: {},
                message: "User already exists"
            });
        }
        return res.status(StatusCode.CREATED).json({
            success: true,
            data: user,
            message: "User created successfully"
        })
    } catch (error) {
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            data: {},
            message: "Internal server error"
        })
    }
}

async function getUserById(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const user = await userService.getUserById(id);
        if(!user) {
            return res.status(StatusCode.NOT_FOUND).json({
                success: false,
                data: {},
                message: "User not found"
            });
        }
        return res.status(StatusCode.SUCCESS).json({
            success: true,
            data: user,
            message: "User retrieved successfully"
        })
    } catch (error) {
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            data: {},
            message: "Internal server error"
        })
    }
}