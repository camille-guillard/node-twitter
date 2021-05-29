const { createUser, findUser, findUserByUsername, searchUsersByUsername, addUserIdToCurrentUserFollowing, removeUserIdToCurrentUserFollowing, findUserById } = require('../queries/users.queries');
const { getUserTweetsByAuthorId } = require('../queries/tweets.queries');
const path = require('path')
const multer = require('multer');
const upload = multer({ storage: multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/img/avatars'));
  },
  filename: (req, file, cb) => {
    cb(null, `${ Date.now() }-${ file.originalname }`);
  }
})});

exports.userList = async(req, res, next) => {
  try {
    const search = req.query.search;
    const users = await searchUsersByUsername(search);
    res.render('includes/search-menu', { users })
  } catch(e) {
    next(e);
  }
}

exports.userProfile = async(req, res, next) => {
  try {
    const username = req.params.username;
    const user = await findUserByUsername(username);
    const tweets = await getUserTweetsByAuthorId(user._id);
    res.render('tweets/tweet', 
    { 
      tweets, 
      isAuthenticated: req.isAuthenticated(), 
      currentUser: req.user, 
      user, 
      editable: false
    });
  } catch(e) {
    next(e);
  }
}

exports.signupForm = (req, res, next) => {
  res.render('users/user-form', { errors: null, isAuthenticated: req.isAuthenticated(), currentUser: req.user });
}

exports.signup = async (req, res, next) => {
  try {
    const body = req.body;

    var user = await findUser(body);
    if (user != null) {
      console.log(user);
      res.status(400).render('users/user-form', { errors: [ 'User already exists!' ], isAuthenticated: req.isAuthenticated(), currentUser: req.user });
    }

    user = await createUser(body);
    res.redirect('/');
  } catch(e) {
    res.status(500).render('users/user-form', { errors: [ e.message ], isAuthenticated: req.isAuthenticated(), currentUser: req.user });
  }
}

exports.uploadImage = [
  upload.single('avatar'),
  async (req, res, next) => {
    try {
      const user = req.user;
      user.avatar = `/img/avatars/${ req.file.filename }`;
      await user.save();
      res.redirect('/');
    } catch(e) {
      next(e);
    }
  }
]

exports.followUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    console.log(req.user+' '+userId)

    const [, user] = await Promise.all([ addUserIdToCurrentUserFollowing(req.user, userId), findUserById(userId)]);
    console.log(req.user+' '+userId)
    res.redirect(`/users/${ user.username }`);
  } catch(e) {
    next(e);
  }
}

exports.unfollowUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const [, user] = await Promise.all([ removeUserIdToCurrentUserFollowing(req.user, userId), findUserById(userId)]);
    res.redirect(`/users/${ user.username }`);
  } catch(e) {
    next(e);
  }
}