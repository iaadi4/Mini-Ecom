import { Router } from "express";
import userController from "../controllers/userController";
import authenticateUser from "../middlewares/authMiddleware";

const router = Router();

router.get('/:id', authenticateUser, userController.getUserById);

export default router;