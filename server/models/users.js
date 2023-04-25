import mongoose from "mongoose";

const userScehema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

//const user = mongoose.model("user", userScehema);

export const userModel = mongoose.model("user", userScehema);