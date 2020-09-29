const express = require('express');
const router = express.Router();

const Mission = require('../controller/mission/mission');

router.get('/:id', Mission.get);

module.exports = router;