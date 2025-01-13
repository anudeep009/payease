import { Router } from "express";
import  verifyJWT  from "../middlewares/verifyJWT.js";
import { searchUser, updateUser } from "../controllers/user.actions.js";

const router = Router();

/*
search for user by firstname or lastname
*/
router.get('/search', searchUser);

/*
update the user details like firstname, lastname and password
*/
router.put("/update-user", verifyJWT, updateUser);


export default router;