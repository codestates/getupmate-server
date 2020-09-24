const express = require('express');
const router = express.Router();

const Signin = require('../controller/user/signin');

router.post('/signin', Signin.post);



module.exports = router;