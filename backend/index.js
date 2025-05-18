import cors from "cors";
import express from "express";
import UserRoute from "./routes/UserRoute.js";
import NotesRoute from "./routes/NotesRoute.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";


const app = express();
app.set("view engine", "ejs");

dotenv.config();
app.use(cookieParser());
app.use(cors({ credentials:true,origin:'https://asisten-tcc-a.as.r.appspot.com' }));
app.use(express.json());
app.get("/", (req, res) => res.render("index"));
app.use(UserRoute);
app.use(NotesRoute);

app.listen(5000, () => console.log("Server connected"));