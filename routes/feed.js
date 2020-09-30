const express = require('express');
const router = express.Router();

const myFeed = require('../controller/feed/Feed');
const homeFeed = require('../controller/feed/HomeFeed');
const makeFeed = require('../controller/feed/MakeFeed');

router.get('/myfeed/:id', myFeed.getMyFeed);
router.get('/makefeed/:id', makeFeed.makeFeed);
router.get('/homefeed/:id', homeFeed.getHome);

module.exports = router;