const cassandraClient = require("../database/cassandraConnection");
const { v4: uuid } = require('uuid');
const { selectTextsByUserStmt, insertTextStmt, checkTextAuthorStmt, editTextStmt } = require("../database/cassandraQueries");

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

const checkTextAuthor = async(userId, textId) => {
    try{
        console.log("TXTID",textId)
        console.log("TXTID2",userId)
        const result = await cassandraClient.execute(checkTextAuthorStmt,[userId,textId],{ prepare: true });
        console.log(result)
        if(result.rowLength) return true;
        else throw new Error("Author doesnot match");
    }catch(error){
        throw error;
    }
}


const editUserTexts = async(textId,text,userId) => {
    try{
        const result = await cassandraClient.execute(editTextStmt,[text, userId, textId],{ prepare: true });
        return result;
    }catch(error){
        throw error;
    }
}

module.exports = {
    getUserTexts,
    addUserTexts,
    checkTextAuthor,
    editUserTexts
}
