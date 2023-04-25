import express from "express";
import bcrypt from "bcrypt";
import { userModel } from "../models/users.js";
import session from "express-session";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/signup", async (req, res) => {
    const {email, username, password} = req.body;
    const user = await userModel.findOne({username});
    if(user) {
        return res.status(404).send({message: "User already exists"});
    }
    const hashPassword = await bcrypt.hash(password, 10);

    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });

    let message = {
        from: '"The admin" <Admin@server.dk>', // sender address
        to: email, // list of receivers
        subject: "Congrats on signing up with us", // Subject line
        text: `You've been registered, ${username}, with the email: ${email}`, // plain text body
        html: `You've been registered, ${username}, with the email: ${email}` // html body
    };

    transporter.sendMail(message).then((info) => {
        return res.status(201)
        .json({ 
            message: "mail sent",
            info : info.messageId,
            preview: nodemailer.getTestMessageUrl(info)
        })
    }).catch(error => {
        return res.status(500).json({ error });
    })

    const newUser = new userModel({email: email, username: username, password: hashPassword});
    await newUser.save();
    //res.send({ Message: "New user created."});
});


router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    const user = await userModel.findOne({username});
    if(!user){
        return res.status(404).send({ message: "Username not found"});
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword){
        res.status(404).send({ message: "Wrong password"});
    }
    req.session.name = user.username;
    console.log(req.session.name);
    req.session.isAuth = true;
    console.log(req.session);
    console.log(req.session.id);

    return res.status(201).send({ message: "You've logged in"})
});


router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.send({ message: "You've logged out."})
    })
});


/*
router.get("/", (req, res) => {
    if (req.session.authorized){
        res.send({ Success: "You've logged in"})
    } else {
        res.redirect("/login");
    };
});
*/


export default router;