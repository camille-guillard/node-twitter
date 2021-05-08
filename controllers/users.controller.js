const { createUser, findUser } = require('../queries/users.queries')

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