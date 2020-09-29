const express = require('express');
const router = express.Router();

const myFeed = require('../controller/feed/Feed');

router.get('/myfeed/:id', myFeed.getMyFeed);

module.exports = router;