const express = require('express');
const {
    userTextsController,
    addUserTextsController,
    editTextController,
    deleteTextController
} = require('../controllers/text.contoller');
const { getUserMiddleware } = require('../middlewares/getUser.middleware');
const checkTextAuthorMiddleware = require('../middlewares/checkTextAuthor.middleware');
const router = express.Router();

router.route("/text/user/:id")
.get(getUserMiddleware, userTextsController)
.post(getUserMiddleware, addUserTextsController)
.patch(getUserMiddleware, editTextController)
.delete(getUserMiddleware, deleteTextController);

module.exports = router;