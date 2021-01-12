import jwt from "jsonwebtoken";

export function authorize(req, res, next){
    
    const token = req.body.token;
    console.log(req);
    if(!token){
        console.log("toekn : ", token);
        res.status(401).json({
            message: "Forbidden 🚫🚫🚫",
        });
    }else{
        const id = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.body.id = id;   
        next();
    }
}