import ChatRoom from "../models/chatRoom.js";

export async function createChatroom(req, res, next) {
    const { name } = req.body;
    console.log("Name : " ,name);
    const nameRegex = /^[A-Za-z\s]+$/;
    if(!nameRegex.test(name)) throw "Name should contain alphabet";

    const chatroom = await ChatRoom.findOne({ name });
    if(chatroom)
        throw "Chatroom with this name already exists";

    const room  = new ChatRoom({
        name
    });

    await room.save();
    res.json({
        message: "Chatroom created!",
    });
}

export async function getAllChatRooms(req, res) {
    const chatrooms = await ChatRoom.find({});
    res.json(chatrooms);
}