import cors from "cors";
import express from "express";
import UserRoute from "./routes/UserRoute.js";
import NotesRoute from "./routes/NotesRoute.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";


const app = express();

app.use(express.json());
dotenv.config();
app.use(cookieParser());
app.use(cors({ credentials:true,origin:'https://fe-196-dot-c-05-451109.ue.r.appspot.com'
 }));
app.set('view engine', 'ejs');
app.get("/", (req, res) => res.json({ message: "API is running" }));
app.use(UserRoute);
app.use(NotesRoute);

app.listen(3000, () => console.log("Server connected"));