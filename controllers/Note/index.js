const { Note } = require("../../models/Note");

// create note
const createNote = async (credentials) => {
  try {
    const note = await Note.create({
      ...credentials
    });
    await note.save();
    return note;
  } catch (error) {
    throw error;
  }
};

// get all notes
const getAllNotes = async (userId) => {
  try {
    const notes = await Note.find({ creator: userId });
    return notes;
  } catch (error) {
    throw error;
  }
};

// delete a particular Note
const deleteNote = async (id) => {
  try {
    await Note.findByIdAndDelete(id);
    return "success";
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createNote,
  getAllNotes,
  deleteNote
};
