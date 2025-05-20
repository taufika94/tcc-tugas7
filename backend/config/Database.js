import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const DB_NAME = process.env.DB_NAME;
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

const db = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  logging: console.log, // Tambahkan ini untuk melihat query SQL yang dijalankan
});

// Fungsi untuk mengecek koneksi database
export const testConnection = async () => {
  try {
    await db.authenticate();
    console.log('Koneksi database berhasil.');
    return { success: true };
  } catch (error) {
    console.error('Koneksi database gagal:', error.message);
    // Optional: log lebih lengkap untuk debugging
    console.error(error);
    return {
      success: false,
      error: error.message,
      code: error.original?.code || null, // misalnya ECONNREFUSED
      errno: error.original?.errno || null
    };
  }
};

testConnection();

export default db;