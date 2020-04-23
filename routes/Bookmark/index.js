const route = require("express").Router();
const {
  createBookmark,
  getAllBookmarks,
  deleteBookmark
} = require("../../controllers/Bookmark");

//create bookmark
route.post("/add", async (req, res) => {
  try {
    const { title, description, url, creator } = req.body;
    const bookmark = await createBookmark({ title, description, url, creator });
    res.send(bookmark);
  } catch (error) {
    throw error;
  }
});

// get all bookmarks
route.get("/all/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const bookmarks = await getAllBookmarks(id);
    res.send(bookmarks);
  } catch (error) {
    throw error;
  }
});

// delete bookmark
route.get("/remove/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteBookmark(id);
    res.send(result);
  } catch (error) {
    throw error;
  }
});

module.exports = route;
