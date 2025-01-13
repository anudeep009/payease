import { Router } from "express";
import  verifyJWT  from "../middlewares/verifyJWT.js";
import { searchUser } from "../controllers/user.actions.js";

const router = Router();

/*
search for user by firstname or lastname
*/
router.get('/search', searchUser);


export default router;