const express = require('express');
const userSignUpMiddleware = require('../middlewares/userSignUp.middleware');
const { userSignUpController } = require('../controllers/user.controller');
const createJWTMiddleware = require('../middlewares/createJWT.middleware');
const router = express.Router();

router.get("/user/:id");
router.post("/user", userSignUpMiddleware, userSignUpController, createJWTMiddleware);
module.exports = router;