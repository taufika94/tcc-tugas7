import { DataTypes } from "sequelize";
import db from "../config/Database.js";
import User from "./User Model.js";

const Notes = db.define(
  "note",
  {
    judul: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    },
  },
  { freezeTableName: true }
);

// Relasi
User .hasMany(Notes, { foreignKey: "userId", onDelete: "CASCADE" });
Notes.belongsTo(User, { foreignKey: "userId" });

export default Notes;
