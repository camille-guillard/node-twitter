const { createUser, findUser } = require('../queries/users.queries');
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