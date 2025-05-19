// controllers/NotesController.js
import Notes from "../models/NotesModel.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await Notes.findAll({ where: { userId: req.user.id } });
    res.json(notes);
  } catch (e) { console.log(e); }
};

export const getNotesById = async (req, res) => {
  try {
    const note = await Notes.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!note) return res.sendStatus(404);
    res.json(note);
  } catch (e) { console.log(e); }
};

export const createNotes = async (req, res) => {
  try {
    await Notes.create({ ...req.body, userId: req.user.id });
    res.status(201).json({ msg: "Notes Created" });
  } catch (e) { console.log(e); }
};

export const updateNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    // Validasi sederhana
    if (!id || !userId) {
      return res.status(400).json({ message: "Invalid request" });
    }
    console.log(req.body)

    const [updatedCount] = await Notes.update(req.body, {
      where: {
        id,
        userId
      },
    });

    if (updatedCount === 0) {
      return res.status(404).json({ message: "Note not found or not authorized" });
    }

    return res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    console.error("Error updating note:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const deleteNotes = async (req, res) => {
  try {
    const rows = await Notes.destroy({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!rows) return res.sendStatus(404);
    res.json({ msg: "Notes Deleted" });
  } catch (e) { console.log(e); }
};
