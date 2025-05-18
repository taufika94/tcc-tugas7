// routes/NotesRoute.js
import express from "express";
import {
  getNotes,
  getNotesById,
  createNotes,
  updateNotes,
  deleteNotes,
} from "../controllers/NotesController.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get("/notes", verifyToken, getNotes);
router.get("/notes/:id", verifyToken, getNotesById);
router.post("/notes", verifyToken, createNotes);
router.patch("/notes/:id", verifyToken, updateNotes);
router.delete("/notes/:id", verifyToken, deleteNotes);

export default router;
