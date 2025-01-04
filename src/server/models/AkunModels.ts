import { DataTypes, Model } from "sequelize";
import type { InferAttributes, InferCreationAttributes } from "sequelize";
import db from "../config/db";

const isSyncEnabled = false;

interface AkunModel
  extends Model<
    InferAttributes<AkunModel>,
    InferCreationAttributes<AkunModel>
  > {
  id: number;
  FullName: string;
  Email: string;
  Password: string;
  PhoneNumber?: string;
  Alamat?: string;
  Role?: string;
  isSuperAdmin: "SuperAdmin" | "Admin" | "User";
}

const Akun = db.define<AkunModel>(
  "akun",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    FullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PhoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Alamat: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isSuperAdmin: {
      type: DataTypes.ENUM("SuperAdmin", "Admin", "User"),
      defaultValue: "User",
      allowNull: false,
    },
  },
  {
    tableName: "akun",
    timestamps: false,
  }
);

export default Akun;

(async () => {
  if (isSyncEnabled) {
    console.log("Menyinkronkan database");
    await db.sync({ alter: true });
  } else {
    console.log("Melewatkan sinkronisasi database");
  }
})();
