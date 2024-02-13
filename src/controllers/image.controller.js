const { selectParticularImageStmt } = require("../database/cassandraQueries");
const {addUserImage,selectUserImages, checkImageAuthor, deleteImage} = require("../services/image.service")
const path = require("path")
const fs = require("fs").promises

/**
 * Controller to select images associated with the user.
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 */
const selectUserImageController = async (req, res) => {
    try {
        const result = await selectUserImages(req.userId);
        if (result instanceof Error) {
            throw result;
        }
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/**
 * Controller to get a single image of the author.
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 */
const getSingleImageOfAuthor = async (req, res) => {
    try {
        const result = await checkImageAuthor(req.userId, req.body.imageId);
        if (result instanceof Error) {
            throw result;
        }
        const imageName = result.image;
        const imageFile = path.join(__dirname, '../static/uploads/' + imageName);
        res.status(200).sendFile(imageFile);
    } catch (error) {
        console.log(error)
        res.status(400).send("Error sending image");
    }
}

/**
 * Controller to add user images.
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 */
const addUserImagesController = async (req, res) => {
    try {
        const result = await addUserImage(req.userId, req.fileName);
        if (result instanceof Error) {
            throw result;
        }
        res.status(200).send("File Uploaded Successfully");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

/**
 * Controller to delete user images.
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 */
const deleteUserImagesController = async (req, res) => {
    try {
        const imageDoc = await checkImageAuthor(req.userId, req.body.imageId);
        const result = await deleteImage(req.userId, req.body.imageId);
        if (result instanceof Error || imageDoc instanceof Error) {
            throw result;
        }
        const image = imageDoc.image;
        await fs.unlink(path.join(__dirname, '../static/uploads/' + image));
        res.status(200).send("Image Deleted Successfully");
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message);
    }
}

module.exports = {
    selectUserImageController,
    addUserImagesController,
    getSingleImageOfAuthor,
    deleteUserImagesController
}