import express from "express";
import { LoginAkun } from "../controllers/AkunControllers";
import { AccessToken } from "../controllers/TokenControllers";
import { Logout } from "../controllers/LogoutControllers";

const router = express.Router();

router.post("/api/auth/login", LoginAkun);
router.get("/api/auth/access-token", AccessToken);
router.post("/api/auth/logout", Logout);

export default router;
