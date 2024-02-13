const express = require('express');
const { addUserImagesController, selectUserImageController, getSingleImageOfAuthor, deleteUserImagesController } = require('../controllers/image.controller');
const { getUserMiddleware } = require('../middlewares/getUser.middleware');
const upload = require('../configs/multerUpload.config');
const router = express.Router();

router.route("/images/user/:id")
.get(getUserMiddleware, selectUserImageController)
.post(getUserMiddleware, upload,  addUserImagesController)

router.route("/images/:id")
.get(getUserMiddleware, getSingleImageOfAuthor)
.delete(getUserMiddleware, deleteUserImagesController);

module.exports = router;