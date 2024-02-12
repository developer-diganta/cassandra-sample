const userList = require("../static/users.json");

/**
 * Retrieves a user from the user list based on the user ID.
 * 
 * @param {string} userId - The ID of the user to retrieve.
 * @returns {Object|Error} - The user object if found, or an Error object if the user is not found.
 */
const getUserFromList = async (userId) => {
    try {
        const user = userList.find(obj => obj.uuid === userId);
        if (user) {
            return user; 
        } else {
            throw new Error("User Not Found"); 
        }
    } catch (error) {
        return error; 
    }
}

module.exports = {
    getUserFromList
}
