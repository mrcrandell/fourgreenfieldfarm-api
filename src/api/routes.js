/* eslint-disable global-require, import/no-dynamic-require */
const express = require('express');
const fs = require('fs');

const router = express.Router();

router.use('/cal-event', require('./routes/calEvent.routes'));
router.use('/status', require('./routes/status.routes'));
router.use('/user', require('./routes/user.routes'));

module.exports = router;
