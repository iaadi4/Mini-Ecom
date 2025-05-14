import { PrismaClient} from "../generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

interface SignupData {
    name: string
    email: string
    password: string
}

interface LoginData extends Omit<SignupData, "name"> {}

class UserService {
    async signup({ name, email, password }: SignupData) {
        try {
            if(!name || !email || !password) {
                throw new Error("All fields are required");
            }
            const checkExistingUser = await prisma.user.findUnique({
                where: {
                    email
                }
            })
            if(checkExistingUser) {
                throw new Error("User already exists with this email");
            }
            const encryptedPassword = bcrypt.hashSync(password, 10);
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: encryptedPassword
                }
            })
            return user;
        } catch (error) {
            console.error("Error in service layer:", error);
            throw new Error("Error creating user");
        }
    }

    async login({ email, password }: LoginData) {
        try {
            if(!email || !password) {
                throw new Error("All fields are required");
            }
            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            })
            if(!user) {
                throw new Error("User not found");
            }
            if(!bcrypt.compareSync(password, user.password)) {
                throw new Error("Invalid password");
            }
            return user;
        } catch (error) {
            console.error("Error in service layer:", error);
            throw new Error("Error logging in user");
        }
    }

    async getUserById(id: string) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id
                }
            })
            if(!user) {
                throw new Error("User not found");
            }
            return user;
        } catch (error) {
            console.error("Error in service layer:", error);
            throw new Error("Error fetching user");
        }
    }
}

export const userService = new UserService();
export default userService;