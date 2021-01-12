import { Router } from "express";
import { createChatroom, getAllChatRooms } from "../controllers/chatroomController.js";
import { catchErrors } from "../helpers/errorHandlers.js";

const router = Router();

router.post("/", catchErrors(createChatroom));
router.get("/chatroom", catchErrors(getAllChatRooms));

export default router;