const express = require('express');
const router = express.Router();

const Alarm = require('../controller/alarm/alarm');

router.get('/:id', Alarm.get);
router.post('/:id', Alarm.post);
router.delete('/:id/:id?', Alarm.delete);

module.exports = router;