const express = require('express');
const router = express.Router()

const passport = require('passport');
const {isLoggedIn} = require('../lib/auth');


//SIGNUP
router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true 
}));


//SIGNIN
router.get('/signin', (req, res) => {
    res.render('auth/signin');
  });
  

  
  router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
  });
  
  router.get('/profile', isLoggedIn, (req, res) => {
    res.render('profile');
  });



module.exports = router;