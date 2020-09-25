const express = require('express');
const router = express.Router();

const Alarm = require('../controller/alarm/alarm');

router.get('/', Alarm.get);
router.post('/', Alarm.post);
router.delete('/', Alarm.delete);

module.exports = router;