const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");

// port
const port = process.env.PORT || 2000;

const app = express();

app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());
app.use(cors());

// routing
app.use("/api/bookmark", require("./routes/Bookmark"));
app.use("/api/note", require("./routes/Note"));
app.use("/api/user", require("./routes/User"));

// mongoUri.
const mongoURI = config.get("mongoURI");

// db connection
const connection = mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useCreateIndex: true
});

app.listen(port, () => {
  console.log(`server started at ${port}`);
});
