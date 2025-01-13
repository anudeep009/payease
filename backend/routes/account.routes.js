import { Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import { getBalance } from "../controllers/account.controller.js";

const router = Router();

router.get("/balance/:userid",verifyJWT, getBalance);

export default router;
