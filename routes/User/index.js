const route = require("express").Router();
const { User } = require("../../models/User");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createUser, getUser } = require("../../controllers/User");

// create user
route.post("/signup", async (req, res) => {
  try {
    const { username, name, email, password } = req.body;
    console.log(req.body);
    // validation
    if (!username || !name || !email || !password) {
      return res.status(400).send("Please enter all credentials!");
    }
    // check for existing user
    const user = await User.findOne({
      email
    });

    if (user) {
      return res.status(400).send("User already exists!");
    }

    const newUser = await createUser(username, name, email, password);

    jwt.sign(
      {
        id: newUser.id
      },
      process.env.JWT_SECRET,
      (err, token) => {
        if (err) throw err;
        res.send({
          token,
          user: {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
          }
        });
      }
    );
  } catch (error) {
    throw error;
  }
});

// login user
route.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
      return res.status(400).send("Please enter all credentials!");
    }

    // check for existing user
    const user = await User.findOne({
      email
    });
    if (!user) {
      return res.status(400).send("User does not exist!");
    }

    // compare password
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      jwt.sign(
        {
          id: user.id
        },
        process.env.JWT_SECRET,
        (err, token) => {
          if (err) throw err;
          res.send({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          });
        }
      );
    } else {
      return res.status(400).send("Password incorrect!");
    }
  } catch (error) {
    throw error;
  }
});

// get user
route.get("/", async (req, res) => {
  try {
    const user = await getUser(req.user.id);
    res.send(user);
  } catch (error) {
    throw error;
  }
});

// update user
// route.post("/update/:id", async (req, res) => {
//   try {
//     const user = await updateUser(req.params.id, {
//       ...req.body
//     });
//     res.send(user);
//   } catch (error) {
//     throw error;
//   }
// });

// username available
// route.get("/username/:username", async (req, res) => {
//   try {
//     const user = await usernameAvailable(req.params.username);
//     if (!user) res.send("username available!");
//     else res.send("username unavailable!");
//   } catch (error) {
//     throw error;
//   }
// });

module.exports = route;
