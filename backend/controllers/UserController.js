import User from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// GET
async function getUsers(req, res) {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
}

// GET BY ID
async function getUserById(req, res) {
  try {
    const response = await User.findOne({ where: { id: req.params.id } });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
}

// REGISTER
async function createUser (req, res) {
  try {
    const { name, email, gender, password } = req.body;
     // Validasi sederhana
    if (!name || !email || !gender || !password) {
      return res.status(400).json({
        error: "Validasi gagal",
        detail: "Semua field wajib diisi"
      });
    }

    if (password.length < 5) {
      return res.status(400).json({
        error: "Validasi gagal",
        detail: "Password minimal 5 karakter"
      });
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        error: "Validasi gagal",
        detail: "Email sudah terdaftar"
      });
    }

    const encryptPassword = await bcrypt.hash(password, 5);
    await User.create({
      name,
      email,
      gender,
      password: encryptPassword,
    });
    res.status(201).json({ msg: "Register Berhasil" });
  } catch (error) {
    console.error("Full error object:", error);
    res.status(500).json({
      error: "Terjadi kesalahan saat mendaftarkan user.",
      detail: error.message,
    });
  }
}

// UPDATE USER
async function updateUser (req, res) {
  try {
    const { name, email, gender, password, label } = req.body; // Tambahkan label di sini
    let updatedData = {
      name,
      email,
      gender,
    };

    if (password) {
      const encryptPassword = await bcrypt.hash(password, 5);
      updatedData.password = encryptPassword;
    }

    const result = await User.update(updatedData, {
      where: {
        id: req.params.id
      }
    });

    // Periksa apakah ada baris yang terpengaruh (diupdate)
    if (result[0] === 0) {
      return res.status(404).json({
        status: 'failed',
        message: 'User  tidak ditemukan atau tidak ada data yang berubah',
        updatedData: updatedData,
        result
      });
    }

    res.status(200).json({ msg: "User  Updated" });
  } catch (error) {
    console.log(error.message);
  }
}


// DELETE USER
async function deleteUser (req, res) {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.status(201).json({ msg: "User  Deleted" });
  } catch (error) {
    console.log(error.message);
  }
}

// LOGIN HANDLER
// LOGIN HANDLER
async function loginHandler(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      const decryptPassword = await bcrypt.compare(password, user.password);
      if (decryptPassword) {
        const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
        const refreshToken = jwt.sign({ id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
        await User.update({ refresh_token: refreshToken }, { where: { id: user.id } });
        res.cookie("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // aktifkan jika pakai HTTPS
          sameSite: "none",
          maxAge: 24 * 60 * 60 * 1000, // 1 hari
        });
        res.status(200).json({ accessToken });
      } else {
        res.status(400).json({ message: "Invalid email or password" });
      }
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// LOGOUT
async function logout(req, res) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204);
  const user = await User.findOne({
    where: {
      refresh_token: refreshToken
    }
  });
  if (!user || !user.refresh_token) return res.sendStatus(204);
  const userId = user.id;
  await User.update({ refresh_token: null }, {
    where: {
      id: userId
    }
  });
  res.clearCookie('refreshToken');
  return res.sendStatus(200);
}

export { getUsers, getUserById, createUser , updateUser , deleteUser , loginHandler, logout };