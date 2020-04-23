const route = require("express").Router();
const {
  createNote,
  getAllNotes,
  deleteNote
} = require("../../controllers/Note");

//create note
route.post("/add", async (req, res) => {
  try {
    const { title, description, creator } = req.body;
    const note = await createNote({ title, description, creator });
    res.send(note);
  } catch (error) {
    throw error;
  }
});

// get all notes
route.get("/all/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const notes = await getAllNotes(id);
    res.send(notes);
  } catch (error) {
    throw error;
  }
});

// delete note
route.get("/remove/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteNote(id);
    res.send(result);
  } catch (error) {
    throw error;
  }
});

module.exports = route;
