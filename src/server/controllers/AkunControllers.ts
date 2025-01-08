import type { Request, Response } from "express";
import { Sequelize } from "sequelize";
import Akun from "../models/AkunModels";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const LoginAkun = async (req: Request, res: Response): Promise<void> => {
  try {
    const { identifier, Password } = req.body;
    const user = identifier.includes("@")
      ? await Akun.findOne({
          where: Sequelize.where(
            Sequelize.col("Email"),
            Sequelize.literal(`BINARY '${identifier}'`)
          ),
        })
      : await Akun.findOne({
          where: Sequelize.where(
            Sequelize.col("Username"),
            Sequelize.literal(`BINARY '${identifier}'`)
          ),
        });

    if (!user) {
      res.status(401).json({
        message:
          "Akun tidak ditemukan. || Silahkan Daftarkan Akun Terlebih Dahulu",
      });
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
    const role = user.Role;

    res.status(200).json({
      message: "Login berhasil.",
      role,
      accessToken,
      redirect,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};

export const postAkun = async (req: Request, res: Response): Promise<void> => {
  const { Username, FullName, Email, Password, PhoneNumber, Alamat, Role } =
    req.body;

  try {
    const existingEmail = await Akun.findOne({ where: { Email } });
    if (existingEmail) {
      res.status(400).json({
        message: "Email sudah digunakan",
      });
      return;
    }

    const existingUsername = await Akun.findOne({ where: { Username } });
    if (existingUsername) {
      res.status(400).json({
        message: "Username sudah Terdaftar",
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
      Username,
      FullName,
      Email,
      Password: hashedPassword,
      PhoneNumber,
      Alamat,
      Role,
      isSuperAdmin: "Admin",
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

export const GetAkun = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const akun = await Akun.findOne({ where: { id } });
    res.status(200).json(akun);
  } catch (error) {
    console.error("Kesalahan saat menambahkan akun:", error);
    res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
};

export const UpdateAkun = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { Username, FullName, Email, PhoneNumber, Alamat, Role } = req.body;

  try {
    const akun = await Akun.findOne({ where: { Username } });
    if (!akun) {
      res.status(404).json({ message: "Akun tidak ditemukan." });
      return;
    }

    akun.FullName = FullName;
    akun.Email = Email;
    akun.PhoneNumber = PhoneNumber;
    akun.Alamat = Alamat;
    akun.Role = Role;
    await akun.save();

    res.status(200).json({
      message: "Akun berhasil diperbarui.",
      akun,
      redirect: "/superadmin/akun",
    });
  } catch (error) {
    console.error("Kesalahan saat memperbarui akun:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};

export const DeleteAkun = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  try {
    const akun = await Akun.findOne({ where: { id } });
    if (!akun) {
      res.status(404).json({ message: "Akun tidak ditemukan." });
      return;
    }

    await akun.destroy();

    res.status(200).json({ message: "Akun berhasil dihapus." });
  } catch (error) {
    console.error("Kesalahan saat menghapus akun:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};
