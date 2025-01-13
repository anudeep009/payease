import { Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
import { getBalance, transfer } from "../controllers/account.controller.js";

const router = Router();

//route for to fetch balance
router.get("/balance/:userid",verifyJWT, getBalance);

//route for transfer amount
router.post("/transfer",verifyJWT, transfer);

export default router;
