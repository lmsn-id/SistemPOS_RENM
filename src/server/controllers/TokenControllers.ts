import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

interface CustomJwtPayload extends JwtPayload {
  id: string;
  role: string;
  fullName: string;
  isSuperAdmin: boolean;
}

export const AccessToken = (req: Request, res: Response): void => {
  try {
    const session_token = req.cookies?.session_token;

    if (!session_token) {
      res.status(401).json({ message: "Tidak ada token sesi." });
      return;
    }

    const payload = jwt.verify(
      session_token,
      process.env.JWT_SECRET || "secret"
    ) as CustomJwtPayload;

    res.status(200).json({
      id: payload.id,
      role: payload.role,
      fullName: payload.fullName,
      isSuperAdmin: payload.isSuperAdmin,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("AccessToken error:", error.message);
      res
        .status(401)
        .json({ message: "Token tidak valid atau sudah kadaluarsa." });
    } else {
      console.error("AccessToken error: An unknown error occurred.");
      res.status(500).json({ message: "Terjadi kesalahan server." });
    }
  }
};
