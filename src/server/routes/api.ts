import express from "express";
import {
  LoginAkun,
  postAkun,
  GetAllAkun,
  GetAkun,
  UpdateAkun,
  DeleteAkun,
} from "../controllers/AkunControllers";
import { AccessToken } from "../controllers/TokenControllers";
import { Logout } from "../controllers/LogoutControllers";

const router = express.Router();

router.post("/api/auth/login", LoginAkun);
router.post("/api/auth/add-akun", postAkun);
router.get("/api/auth/get-akun/:id", GetAkun);
router.get("/api/auth/get-all-akun", GetAllAkun);
router.put("/api/auth/update-akun", UpdateAkun);
router.delete("/api/auth/delete-akun/:id", DeleteAkun);
router.get("/api/auth/access-token", AccessToken);
router.post("/api/auth/logout", Logout);

export default router;
