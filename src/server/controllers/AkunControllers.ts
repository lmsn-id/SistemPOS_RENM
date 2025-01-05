import type { Request, Response } from "express";
import Akun from "../models/AkunModels";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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

    const isPasswordValid = await bcrypt.compare(Password, user.Password);
    if (!isPasswordValid) {
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
        redirect = "/superadmin/";
        break;
      case "Admin":
        redirect = "/admin/";
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

export const postAkun = async (req: Request, res: Response): Promise<void> => {
  const { FullName, Email, Password, PhoneNumber, Alamat, Role } = req.body;

  try {
    const existingEmail = await Akun.findOne({ where: { Email } });
    if (existingEmail) {
      res.status(400).json({
        message: "Email sudah digunakan",
      });
      return;
    }

    const existingFullName = await Akun.findOne({ where: { FullName } });
    if (existingFullName) {
      res.status(400).json({
        message: "Fullname sudah Terdaftar",
      });
      return;
    }

    const existingRole = await Akun.findOne({ where: { Role } });
    if (existingRole) {
      res.status(400).json({
        message: "Toko sudah Terdaftar",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const newAkun = await Akun.create({
      FullName,
      Email,
      Password: hashedPassword,
      PhoneNumber,
      Alamat,
      Role,
      isSuperAdmin: "User",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(200).json({
      message: "Akun berhasil ditambahkan",
      data: newAkun,
      redirect: "/superadmin/akun",
    });
  } catch (error) {
    console.error("Kesalahan saat menambahkan akun:", error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

export const GetAllAkun = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const akun = await Akun.findAll();
    res.status(200).json(akun);
  } catch (error) {
    console.error("Kesalahan saat menambahkan akun:", error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};
