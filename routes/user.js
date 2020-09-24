const express = require('express');
const router = express.Router();

const Signin = require('../controller/user/signin');
const Signout = require('../controller/user/signout');
const Changenickname = require('../controller/user/changenickname');

router.post('/signin', Signin.post);
router.post('/signout', Signout.post);
router.post('/changenickname/:id', Changenickname.post);


module.exports = router;