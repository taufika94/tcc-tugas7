import cors from "cors";
import express from "express";
import UserRoute from "./routes/UserRoute.js";
import NotesRoute from "./routes/NotesRoute.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { testConnection } from "./config/Database.js";


const app = express();

app.use(express.json());
dotenv.config();
app.use(cookieParser());
app.use(cors({ credentials:true,origin:'https://fe-196-dot-c-05-451109.ue.r.appspot.com'
 }));
app.set('view engine', 'ejs');
app.get("/", (req, res) => res.json({ message: "API is running" }));
app.get("/db-check", async (req, res) => {
  const isConnected = await testConnection();
  if (isConnected) {
    res.status(200).json({ status: "ok", message: "Database connected." });
  } else {
    res.status(500).json({ status: "error", message: "Database connection failed." });
  }
});

app.use(UserRoute);
app.use(NotesRoute);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server connected on port ${PORT}`));