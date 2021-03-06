var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var passport=require('passport')
var User = require('../models/usersModel');
var authenticate = require('../authenticate');
router.use(bodyParser.json());
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if (req.body.firstname)
        user.firstname = req.body.firstname;
      if (req.body.lastname)
        user.lastname = req.body.lastname;
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      });
    }
  });
})

router.post('/login', (req, res, next) => {
  // info will contain if user doesnt exist or passwords doesnt match. where as err is genunine system error araised
   passport.authenticate('local', (err, user, info) => {
     if (err)
       return next(err);
     // no error but user doesnt exist . returns null or empty list or might password is incorrect
     if (!user) {
       res.statusCode = 401;
       res.setHeader('Content-Type', 'application/json');
       res.json({success: false, status: 'Login Unsuccessful!', err: info});
     }
     //if authenticate('local') is succesful then it adds a methos req.login
     req.logIn(user, (err) => {
       if (err) {
         res.statusCode = 401;
         res.setHeader('Content-Type', 'application/json');
         res.json({success: false, status: 'Login Unsuccessful!', err: 'Could not log in user!'});          
       }
 
       var token = authenticate.getToken({_id: req.user._id});
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json({success: true, status: 'Login Successful!', token: token});
     }); 
   }) (req, res, next);
 });
 router.get('/logout',(req, res,next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});
module.exports = router;
