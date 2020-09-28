const express = require('express');
const router = express.Router();
const passport = require("passport");

const Signin = require('../controller/user/signin');
const Signout = require('../controller/user/signout');
const Signup = require('../controller/user/signup');
const SearchUser = require('../controller/user/searchuser');
const ChangePhoto = require('../controller/user/changephoto');
const ChangeNickname = require('../controller/user/changenickname');

router.post('/signin', Signin.post);
router.post('/signup', Signup.post);
router.post('/signout', Signout.post);
router.post('/searchuser', SearchUser.search);
router.post('/changephoto/:id', ChangePhoto.change);
router.post('/changenickname/:id', ChangeNickname.change);

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/signin" }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;