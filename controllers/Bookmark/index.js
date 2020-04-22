const { Bookmark } = require("../../models/Bookmark");

// create bookmark
const createBookmark = async (credentials) => {
  try {
    const bookmark = await Bookmark.create({
      ...credentials
    });
    await bookmark.save();
    return bookmark;
  } catch (error) {
    throw error;
  }
};

// get all bookmarks
const getAllBookmarks = async (userId) => {
  try {
    const bookmarks = await Bookmark.find({ creator: userId });
    return bookmarks;
  } catch (error) {
    throw error;
  }
};

// delete a particular bookmark
const deleteBookmark = async (id) => {
  try {
    await Bookmark.findByIdAndDelete(id);
    return "success";
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createBookmark,
  getAllBookmarks,
  deleteBookmark
};
