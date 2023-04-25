import express from "express";
import dotenv from "dotenv/config";
import cors from "cors";
//dotenv.config();

import session from "express-session";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("../client/dist"));


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));



import mongoose from "mongoose";
import { error } from "console";


mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true})
.then(() => {
    console.log("Connected to Database");
}).catch(() => {
    console.log(error);
});

const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("Connected to mongoose."))



import userRouter from "./routes/userRouter.js";
app.use(userRouter);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server is running on port: ", PORT));