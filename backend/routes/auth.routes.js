import { Router } from "express";
import { signUp } from "../controllers/auth.controller.js";
import { signIn } from "../controllers/auth.controller.js";

const router = Router();

// ==============================
// authentication routes
//==============================
router.post("/signup", signUp);
router.post("/signin", signIn);


export default router;