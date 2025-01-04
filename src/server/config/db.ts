import { Sequelize } from "sequelize";

const db = new Sequelize("mern_pos", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
