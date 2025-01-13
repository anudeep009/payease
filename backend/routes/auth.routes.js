import { Router } from "express";
import { signUp, signIn, updateUser } from "../controllers/auth.controller.js";
import verifyJWT from "../middlewares/verifyJWT.js";

const router = Router();

// ==============================
// authentication routes
//==============================
router.post("/signup", signUp);
router.post("/signin", signIn);

// ==============================
// protected routes
//==============================

//update user details
router.put("/update-user",verifyJWT ,updateUser);


export default router;