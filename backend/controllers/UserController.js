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
    const { name, email, gender, password } = req.body; // Tambahkan label di sini
    const encryptPassword = await bcrypt.hash(password, 5);
    await User.create({
      name,
      email,
      gender,
      password: encryptPassword,
      label: label || null // Atur label ke null jika tidak ada
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
      label: label || null // Atur label ke null jika tidak ada
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
async function loginHandler(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        email: email
      }
    });

    if (user) {
      const userPlain = user.toJSON(); // Konversi ke object
      const { password: _, refresh_token: __, ...safeUserData } = userPlain;

      const decryptPassword = await bcrypt.compare(password, user.password);
      if (decryptPassword) {
        const accessToken = jwt.sign(safeUserData, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '30s'
        });
        const refreshToken = jwt.sign(safeUserData, process.env.REFRESH_TOKEN_SECRET, {
          expiresIn: '1d'
        });

        const [updated] = await User.update(
          { refresh_token: refreshToken },
          { where: { id: user.id } }
        );

        // Kirim refresh token ke client via HTTP-only cookie
        res.cookie("refreshToken", refreshToken, {
          httpOnly: false,
          secure: true, // aktifkan jika pakai HTTPS
          sameSite: "none", // untuk keamanan CSRF
          maxAge: 24 * 60 * 60 * 1000, // 1 hari
        
        });
        res.status(200).json({
          status: "Success",
          message: "Login Berhasil",
          safeUserData,
          refreshToken
        });
      } else {
        res.status(400).json({
          status: "Failed",
          message: "Password atau email salah",
        });
      }
    } else {
      res.status(400).json({
        status: "Failed",
        message: "Password atau email salah",
      });
    }
  } catch (error) {
    res.status(error.statusCode || 500).json({
      status: "error",
      message: error.message
    });
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