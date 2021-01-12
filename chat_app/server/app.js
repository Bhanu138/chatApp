import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRoutes from "./routes/users.js"; 
import ChatRoutes from "./routes/chatrooms.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Server } from "socket.io";
import jwt from 'jsonwebtoken';
import User from "./models/users.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());



const port = process.env.PORT || 3000;

const uri = `mongodb+srv://Bhanu:${process.env.MONGO_PASSWORD}@cluster0.5p5zo.mongodb.net/chatApp`
mongoose.connect(uri, {
    useNewUrlParser : true, 
    useUnifiedTopology : true,
    useCreateIndex : true}, 
    (err) => {
        if(err){
            console.log("error");
        }else
            console.log("MongoDB connected");
});

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});

const io = new Server(server, {
    cors : "*"
});

io.use(async (socket, next) => {
    try{
        console.log(socket.handshake.query.token);
        const token = socket.handshake.query.token;
        const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log("id : " ,payload);
        socket.userId = payload.id;
        next();
    }catch(err){}
})

io.on("connection", (socket) => {
    console.log("a user connected!!", socket.userId);
    socket.on("disconnect", () => {
        console.log("a user disconnected", socket.userId);
    });
    socket.on("joinRoom", ({ chatroomId }) => {
        socket.join(chatroomId);
        console.log("User joined", chatroomId);
    });
    socket.on("leaveRoom", ({ chatroomId }) => {
        socket.leave(chatroomId);
        console.log("User left", chatroomId);
    });
    socket.on("chatroomMessage", async ({chatroomId, message}) => {
        const userId =  socket.userId;
        const user = await User.findOne({ _id : userId });
        io.to(chatroomId).emit("newMessage", {
            message, 
            name : user.name,
            userId
        });
    });
})
app.use("/user", UserRoutes);
app.use("/", ChatRoutes);




