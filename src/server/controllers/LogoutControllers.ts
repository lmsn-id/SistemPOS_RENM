import type { Request, Response } from "express";

export const Logout = (req: Request, res: Response): void => {
  try {
    const session_token = req.cookies?.session_token;

    if (!session_token) {
      res.status(401).json({ message: "Gagal melakukan logout." });
      return;
    }

    res.clearCookie("session_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    console.log("Token berhasil dihapus:", session_token);

    res.status(200).json({ message: "Logout berhasil.", redirect: "/" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Terjadi kesalahan saat logout." });
  }
};
