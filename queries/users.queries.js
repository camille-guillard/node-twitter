const User = require('../database/models/user.model');


exports.createUser = async (user) => {
  try {
    const hashedPassword = await User.hashPassword(user.password);
    const newUser = new User({
      username: user.username,
      local: {
        email: user.email,
        password: hashedPassword
      }
    })
    return newUser.save();
  } catch(e) {
    throw e;
  }
}

exports.findUser = (user) => {
  return User.findOne({ $or: [ { 'local.email': user.email }, { 'username': user.username }] }).exec();
}

exports.findUserByEmail = (email) => {
  return User.findOne({ 'local.email': email}).exec();
}

exports.findUserByUsername = (username) => {
  return User.findOne({ 'username': username}).exec();
}

exports.findUserById = (id) => {
  return User.findById(id).exec();
}