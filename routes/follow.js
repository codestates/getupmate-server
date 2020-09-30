const express = require('express');
const router = express.Router();

const Follow = require('../controller/follow/follow');
const Friends = require('../controller/follow/friends');
const Unfollow = require('../controller/follow/unfollow');

router.post('/:id', Follow.post);
router.get('/:id', Friends.get);
router.delete('/:id', Unfollow.delete);

module.exports = router;