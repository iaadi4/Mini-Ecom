import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
