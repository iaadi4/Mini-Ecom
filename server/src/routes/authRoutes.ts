import { Router } from "express";
import userController from "../controllers/userController";
const router = Router();

router.post('/login', userController.login);
router.post('/signup', userController.signup);

export default router;