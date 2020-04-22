const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());

// routing

const connection = mongoose.connect(
  "mongodb+srv://neil:<password>@collectapp-joovi.mongodb.net/collectdb?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
  }
);

app.listen(2000, () => {
  console.log("server started at http://localhost:2000");
});
