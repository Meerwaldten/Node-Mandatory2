import express from "express";
import dotenv from "dotenv/config";
import cors from "cors";
import session from "express-session";
import db from "./database/connection.js";

const app = express();
app.use(express.json());
app.use(cors({
        credentials: true,
        origin: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
}));

db;

import userRouter from "./routes/userRouter.js";
app.use(userRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server is running on port: ", PORT));