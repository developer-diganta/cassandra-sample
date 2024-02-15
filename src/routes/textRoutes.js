const express = require('express');
const {
    userTextsController,
    addUserTextsController,
    editTextController,
    deleteTextController
} = require('../controllers/text.contoller');
const { getUserMiddleware } = require('../middlewares/getUser.middleware');
const checkTextAuthorMiddleware = require('../middlewares/checkTextAuthor.middleware');
const verifyJWTMiddleware = require('../middlewares/verifyJWT.middleware');
const router = express.Router();

router.route("/text/user/:id")
.get(verifyJWTMiddleware, getUserMiddleware, userTextsController)
.post(verifyJWTMiddleware, getUserMiddleware, addUserTextsController)
.patch(verifyJWTMiddleware, getUserMiddleware, editTextController)
.delete(verifyJWTMiddleware, getUserMiddleware, deleteTextController);

module.exports = router;