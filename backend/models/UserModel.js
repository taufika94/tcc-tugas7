import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const User = db.define(
  "user", // Nama Tabel
  {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    gender: Sequelize.STRING,
    password: Sequelize.STRING,
    refresh_token: Sequelize.TEXT
  },
  {
    freezeTableName: true
  }
);

export default User;
