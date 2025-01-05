import express from "express";
import {
  LoginAkun,
  postAkun,
  GetAllAkun,
} from "../controllers/AkunControllers";
import { AccessToken } from "../controllers/TokenControllers";
import { Logout } from "../controllers/LogoutControllers";

const router = express.Router();

router.post("/api/auth/login", LoginAkun);
router.post("/api/auth/add-akun", postAkun);
router.get("/api/auth/get-all-akun", GetAllAkun);
router.get("/api/auth/access-token", AccessToken);
router.post("/api/auth/logout", Logout);

export default router;
