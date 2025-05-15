import productController from "../controllers/productController";
import authenticateUser from "../middlewares/authMiddleware";
import { Router } from "express";

const router = Router();

router.post('/list', authenticateUser, productController.list);
router.get('/user', authenticateUser, productController.userProducts);
router.get('/all', authenticateUser, productController.allProducts);
router.get('/filter', authenticateUser, productController.filterSearch);

export default router;