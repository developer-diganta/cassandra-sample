const express = require('express');
const userTexts = require('../controllers/text.contoller');
const { getUser } = require('../services/user.service');
const router = express.Router();

router.route("/text/user/:id")
.get(getUser, userTexts);
// .post();

module.exports = router;