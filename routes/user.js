const express = require('express');
const router = express.Router();

const Signin = require('../controller/user/signin');
<<<<<<< HEAD
const Signout = require('../controller/user/signout');
const Changenickname = require('../controller/user/changenickname');

router.post('/signin', Signin.post);
router.post('/signout', Signout.post);
router.post('/changenickname/:id', Changenickname.post);
=======
const Signup = require('../controller/user/signup');
const SearchUser = require('../controller/user/searchuser');
const ChangePhoto = require('../controller/user/changephoto');
const ChangeNickname = require('../controller/user/changenickname');

router.post('/signin', Signin.post);
router.post('/signup', Signup.post);
router.post('/searchuser', SearchUser.search);
router.post('/changephoto:id', ChangePhoto.change);
router.post('/changenickname/:id', ChangeNickname.change);

>>>>>>> 0b321e5bd4a9e73759d0769a67168b7c93a88d2f


module.exports = router;