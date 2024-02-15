const express = require('express');
const { addUserImagesController, selectUserImageController, getSingleImageOfAuthor, deleteUserImagesController } = require('../controllers/image.controller');
const { getUserMiddleware } = require('../middlewares/getUser.middleware');
const upload = require('../configs/multerUpload.config');
const verifyJWTMiddleware = require('../middlewares/verifyJWT.middleware');
const router = express.Router();

router.route("/images/user/:id")
.get(verifyJWTMiddleware, getUserMiddleware, selectUserImageController)
.post(verifyJWTMiddleware, getUserMiddleware, upload,  addUserImagesController)

router.route("/images/:id")
.get(verifyJWTMiddleware, getUserMiddleware, getSingleImageOfAuthor)
.delete(verifyJWTMiddleware,getUserMiddleware, deleteUserImagesController);

module.exports = router;