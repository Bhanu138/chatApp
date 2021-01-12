import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Chat room is required"]
    }
});

const ChatRoom = new mongoose.model('ChatRoom', chatRoomSchema);

export default ChatRoom;