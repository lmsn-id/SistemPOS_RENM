import type { Request, Response } from "express";
import Akun from "../models/AkunModels";
import jwt from "jsonwebtoken";

export const LoginAkun = async (req: Request, res: Response): Promise<void> => {
  try {
    const { identifier, Password } = req.body;

    const user = identifier.includes("@")
      ? await Akun.findOne({ where: { Email: identifier } })
      : await Akun.findOne({ where: { FullName: identifier } });

    if (!user) {
      res.status(401).json({ message: "Akun tidak ditemukan." });
      return;
    }

    if (Password !== user.Password) {
      res.status(401).json({ message: "Password salah." });
      return;
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        role: user.Role,
        fullName: user.FullName,
      },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      {
        id: user.id,
        role: user.Role,
        fullName: user.FullName,
        isSuperAdmin: user.isSuperAdmin,
      },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );

    res.cookie("session_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    let redirect = "/";
    switch (user.isSuperAdmin) {
      case "SuperAdmin":
        redirect = "/superadmin";
        break;
      case "Admin":
        redirect = "/admin";
        break;
      case "User":
        redirect = "/";
        break;
    }

    res.status(200).json({
      message: "Login berhasil.",
      accessToken,
      redirect,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};
