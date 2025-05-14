const express = require('express');
const router = express.Router();
const { getLatestPressReleases } = require('../controllers/pressReleaseController');

router.get('/latest', getLatestPressReleases);

module.exports = router;