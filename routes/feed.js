const express = require('express');
const router = express.Router();

const MyFeed = require('../controller/feed/feed');
const HomeFeed = require('../controller/feed/homefeed');
const MakeFeed = require('../controller/feed/makefeed');

router.get('/myfeed/:id', MyFeed.getmyfeed);
router.post('/makefeed/:id', MakeFeed.makefeed);
router.get('/homefeed/:id', HomeFeed.gethome);

module.exports = router;
