const express = require('express');
const router = express.Router();
const { getLatestPressReleases, getPressReleasesByDate } = require('../controllers/pressReleaseController');

router.get('/latest', getLatestPressReleases);
router.get('/date/:date', getPressReleasesByDate);

module.exports = router;