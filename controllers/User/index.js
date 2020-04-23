const { User } = require("../../models/User");
const bcrypt = require("bcrypt");

// create User
const createUser = async (username, name, email, password) => {
  try {
    // hashing the password
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    const user = await User.create({
      name,
      username,
      email,
      password: hash
    });
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

// Get User
const getUser = async (userId) => {
  try {
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    throw error;
  }
};

// username available
// const usernameAvailable = async username => {
//   try {
//     const user = await User.findOne({ username });
//     if (user) return user;
//     return null;
//   } catch (error) {
//     throw error;
//   }
// };

// update user
// const updateUser = async (id, updatedCredentials) => {
//   try {
//     const user = await User.findByIdAndUpdate(
//       id,
//       { ...updatedCredentials },
//       { new: true }
//     );
//     await user.save();
//     return user;
//   } catch (error) {
//     throw error;
//   }
// };

module.exports = {
  createUser,
  getUser
  // usernameAvailable,
  // updateUser
};
