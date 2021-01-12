import User from "../models/users.js";
import jwt from "jsonwebtoken";

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET_KEY, {
        expiresIn : 2 * 24 * 60 * 60
    }); 
}

export async function register(req, res, next){
    const { name, email, password } = req.body;
    const user = await new User(req.body).save();
    const token =  createToken(user._id);
    res.cookie("jwt", token, {
        httpOnly : true,
        expiresIn : 2 * 24 * 60 * 60 * 1000
    });
    res.json({
        message: "User [" + name + "] registered successfully!",
    });  
}

export async function login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.login(email, password);
        const token =  createToken(user._id);
    res.json({
        message: "User logged in successfully!",
        token,
    });
}
