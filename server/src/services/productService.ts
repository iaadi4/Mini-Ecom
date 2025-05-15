import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

interface ProductDetails {
    name: string
    description: string
    price: number
    imageUrl?: string
}

class ProductService {
    async list(userId: string, {name, description, price, imageUrl}: ProductDetails) {
        try {
            if(!name || !description || !price) {
                throw new Error("All fields are required");
            }
            const product = await prisma.product.create({
                data: {
                    userId,
                    name,
                    description,
                    price,
                    imageUrl
                }
            })
            return product;
        } catch (error) {
            console.error("Error in service layer", error);
            throw new Error("Failed to list product");
        }
    }

    async userProducts(userId: string) {
        try {
            const userProducts = await prisma.product.findMany({
                where: {
                    userId
                }, 
                orderBy: {
                    'createdAt': 'desc'
                }
            })
            return userProducts;
        } catch (error) {
            console.error("Error in service layer", error);
            throw new Error("Failed to fetch user products");
        }
    }

    async allProducts() {
        try {
            const products = await prisma.product.findMany({
                orderBy: {
                    'createdAt': 'desc'
                }
            });
            return products;
        } catch (error) {
            console.error("Error in service layer", error);
            throw new Error("Failed to fetch products");
        }
    }

    async filterSearch(query: string) {
        try {
            const products = await prisma.product.findMany({
                where: {
                  OR: [
                    {
                      name: {
                        contains: query,
                        mode: 'insensitive',
                      },
                    },
                    {
                      description: {
                        contains: query,
                        mode: 'insensitive',
                      },
                    },
                  ],
                },
            });
            return products;
        } catch (error) {
            console.error("Error in service layer", error);
            throw new Error("Failed to fetch products");
        }
    }
}

export const productSerice = new ProductService();
export default productSerice;