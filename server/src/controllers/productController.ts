import productSerice from "../services/productService";
import StatusCode from "../utils/statusCodes";
import { Request, Response } from "express";

async function list(req: Request, res: Response): Promise<void> {
    const { name, description, price, imageUrl } = req.body;
    try {
        const userId = req.user.userId;
        const numPrice = parseInt(price);
        const data = await productSerice.list(userId, { name, description, price: numPrice, imageUrl });
        if(!data) {
            res.status(StatusCode.BAD_REQUEST).json({
                success: false,
                data: {},
                message: "Failed to list product"
            })
        }
        res.status(StatusCode.SUCCESS).json({
            success: true,
            data,
            message: "Product listed successfully"
        })
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            data: {},
            message: "Internal server error"
        })
    }
}

async function userProducts(req: Request, res: Response): Promise<void> {
    try {
        const userId = req.user.userId;
        const data = await productSerice.userProducts(userId);
        if(!data) {
            res.status(StatusCode.BAD_REQUEST).json({
                success: false,
                data: {},
                message: "Failed to fetch product"
            })
        }
        res.status(StatusCode.SUCCESS).json({
            success: true,
            data,
            message: "Product fetched successfully"
        })
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            data: {},
            message: "Internal server error"
        })
    }
} 

async function allProducts(rq: Request, res: Response): Promise<void> {
    try {
        const data = await productSerice.allProducts();
        if(!data) {
            res.status(StatusCode.BAD_REQUEST).json({
                success: false,
                data: {},
                message: "Failed to fetch product"
            })
        }
        res.status(StatusCode.SUCCESS).json({
            success: true,
            data,
            message: "Product fetched successfully"
        })
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
            success: false,
            data: {},
            message: "Internal server error"
        })
    }
}

async function filterSearch(req: Request, res: Response): Promise<void> {
    try {
        const query = req.params.query;
        const data = await productSerice.filterSearch(query);
        if(!data) {
            res.status(StatusCode.BAD_REQUEST).json({
                success: false,
                data: {},
                message: "Failed to fetch product"
            })
        }
        res.status(StatusCode.SUCCESS).json({
            success: true,
            data,
            message: "Product fetched successfully"
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
    userProducts,
    allProducts,
    list,
    filterSearch
}