const express = require('express');
const userSignUpMiddleware = require('../middlewares/userSignUp.middleware');
const { userSignUpController, getUserController } = require('../controllers/user.controller');
const createJWTMiddleware = require('../middlewares/createJWT.middleware');
const verifyJWTMiddleware = require('../middlewares/verifyJWT.middleware');
const { getUserMiddleware } = require('../middlewares/getUser.middleware');
const userLoginMiddleware = require('../middlewares/userLogin.middleware');
const router = express.Router();

router.post("/user", userSignUpMiddleware, userSignUpController, createJWTMiddleware)
router.post("/user/login", userLoginMiddleware, createJWTMiddleware)
router.get("/user/:id",verifyJWTMiddleware, getUserMiddleware, getUserController)
module.exports = router;