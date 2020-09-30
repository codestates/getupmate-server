const express = require('express');
const router = express.Router();

const MyFeed = require('../controller/feed/Feed');
const HomeFeed = require('../controller/feed/HomeFeed');
const MakeFeed = require('../controller/feed/MakeFeed');

router.get('/myfeed/:id', MyFeed.getmyfeed);
router.post('/makefeed/:id', MakeFeed.makefeed);
router.get('/homefeed/:id', HomeFeed.gethome);

module.exports = router;
