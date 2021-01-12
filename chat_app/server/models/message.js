import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    chatRoom : {
        type : mongoose.Schema.Types.ObjectId,
        required : "Chatroom is required",
        ref : "ChatRoom"
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : "User is required",
        ref : 'User'
    },
    message : {
        type : String,
        required : "Message is required"
    }
})

const Message = new mongoose.model('Message', messageSchema);

export default Message;