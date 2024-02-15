const cassandraClient = require("../database/cassandraConnection");
const { v4: uuid } = require('uuid');
const { selectTextsByUserStmt, insertTextStmt, checkTextAuthorStmt, editTextStmt, deleteTextSmt } = require("../database/cassandraQueries");

/**
 * Retrieves texts associated with a user.
 * 
 * @param {number} userId - The ID of the user.
 * @returns {Promise<Array>} - A promise that resolves to an array of texts.
 * @throws {Error} - If an error occurs while fetching user texts.
 */
const getUserTexts = async (userId) => {
    try {
        const result = await cassandraClient.execute(selectTextsByUserStmt, [userId], { prepare: true });
        return result.rows;
    } catch (error) {
        throw error;
    }
}

/**
 * Adds a new text for a user.
 * 
 * @param {number} userId - The ID of the user.
 * @param {string} text - The text to be added.
 * @returns {Promise<Object>} - A promise that resolves to the result of the insertion operation.
 * @throws {Error} - If an error occurs while adding the text.
 */
const addUserTexts = async (userId, text) => {
    try {
        const result = await cassandraClient.execute(insertTextStmt, [uuid(), userId, text], { prepare: true });
        return result;
    } catch (error) {
        throw error;
    }
}
/**
 * Checks if the provided user ID matches the author of the specified text.
 * @param {string} userId - The ID of the user to be checked.
 * @param {string} textId - The ID of the text to be checked.
 * @returns {boolean} - Returns true if the user is the author of the text, otherwise throws an error.
 */
const checkTextAuthor = async (userId, textId) => {
    try {
        const result = await cassandraClient.execute(checkTextAuthorStmt, [userId, textId], { prepare: true });
        if (result.rowLength) return true;
        else throw new Error("Author does not match");
    } catch (error) {
        throw error;
    }
}

/**
 * Edits the content of a text belonging to the specified user.
 * @param {string} textId - The ID of the text to be edited.
 * @param {string} text - The new content for the text.
 * @param {string} userId - The ID of the user who owns the text.
 * @returns {object} - Returns the result of the edit operation.
 */
const editUserTexts = async (textId, text, userId) => {
    try {
        const result = await cassandraClient.execute(editTextStmt, [text, userId, uuid(textId)], { prepare: true });
        return result;
    } catch (error) {
        throw error;
    }
}

/**
 * Deletes a text associated with the user.
 * @param {*} textId - The ID of the text to delete.
 * @param {*} userId - The ID of the user who owns the text.
 * @returns {Object} - The result of the deletion operation.
 */
const deleteUserTexts = async (textId, userId) => {
    try {
        const result = await cassandraClient.execute(deleteTextSmt, [userId, uuid(textId)], { prepare: true });
        return result;
    } catch (error) {
        throw error;
    }
}



module.exports = {
    getUserTexts,
    addUserTexts,
    checkTextAuthor,
    editUserTexts,
    deleteUserTexts
}
