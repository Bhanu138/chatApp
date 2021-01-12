import express from "express";
import { register, login } from "../controllers/userControllers.js";
import { catchErrors } from "../helpers/errorHandlers.js";

const router = express.Router();

router.post("/register", catchErrors(register));
router.post("/login", catchErrors(login));

export default router;