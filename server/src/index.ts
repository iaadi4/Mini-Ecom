import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import productRoutes from "./routes/productRoutes";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
  
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
