import mongoose from "mongoose";
import dotenv from "dotenv/config";

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

export default db;