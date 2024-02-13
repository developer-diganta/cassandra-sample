const cassandraClient = require("../database/cassandraConnection");
const { insertImageStmt, selectImageStmt, selectParticularImageStmt, deleteImageStmt } = require("../database/cassandraQueries");
const { v4: uuid } = require('uuid');

/**
 * Retrieves images associated with the given user ID.
 * @param {*} userId - The ID of the user.
 * @returns {Array} - An array of images associated with the user.
 */
const selectUserImages = async (userId) => {
    try {
        const result = await cassandraClient.execute(selectImageStmt, [userId], { prepare: true });
        return result.rows;
    } catch (error) {
        throw error;
    }
}

/**
 * Checks if the user is the author of a specific image.
 * @param {*} userId - The ID of the user.
 * @param {*} imageId - The ID of the image.
 * @returns {Object} - Details of the image if the user is the author.
 * @throws {Error} - Throws an error if the user is not the author (Access Forbidden).
 */
const checkImageAuthor = async (userId, imageId) => {
    console.log("UID", userId);
    console.log("IMGID", imageId);
    try {
        const result = await cassandraClient.execute(selectParticularImageStmt, [userId, imageId], { prepare: true });
        if (result.rowLength) {
            return result.rows[0];
        } else {
            throw new Error("Access Forbidden")
        }
    } catch (error) {
        throw error;
    }
}

/**
 * Adds an image for the given user.
 * @param {*} userId - The ID of the user.
 * @param {*} fileName - The name of the image file.
 * @returns {Object} - The result of the insertion operation.
 */
const addUserImage = async (userId, fileName) => {
    try {
        const result = await cassandraClient.execute(insertImageStmt, [uuid(), userId, fileName], { prepare: true });
        return result;
    } catch (error) {
        throw error;
    }
}

/**
 * Deletes an image associated with the given user.
 * @param {*} userId - The ID of the user.
 * @param {*} imageId - The ID of the image to delete.
 * @returns {Object} - The result of the deletion operation.
 */
const deleteImage = async (userId, imageId) => {
    try {
        const result = await cassandraClient.execute(deleteImageStmt, [userId, imageId], { prepare: true });
        return result;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    addUserImage,
    checkImageAuthor,
    selectUserImages,
    deleteImage
};