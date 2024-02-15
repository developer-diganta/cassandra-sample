const userList = require("../static/users.json");
const cassandraClient = require("../database/cassandraConnection");
const { selectUserStmtPublic, selectUsersStmtPublic, insertUser, checkUserCredentialsStmt, selectUserStmt, verifyUserStmt } = require("../database/cassandraQueries");
const { v4: uuid } = require('uuid');

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

const getUser = async (userId) => {
    try{
        const user = await cassandraClient.execute(selectUserStmt,[userId],{prepare:true});
        if(user instanceof Error){
            throw new Error("User not found")
        }
        return user.rows[0];
    }catch(error){
        throw error;
    }
}
const getUsersPublic = async () => {
    try{
        const users = cassandraClient.execute(selectUsersStmtPublic,{prepare:true});
        return users;
    }catch(error){
        throw error;
    }
}

const userSignUp = async (user) => {
    try{
        const id = uuid();
        const result = await cassandraClient.execute(insertUser,[id, user.email, user.name, user.password],{prepare:true});
        result.id=id;
        return result;
    }catch(error){
        throw error;
    }
}

const checkUserCredentials = async (email, id)=>{
    try{
        const result = await cassandraClient.execute(checkUserCredentialsStmt,[id,email],{prepare:true});
        if(result.rowLength){
            return 1;
        }else{
            throw new Error("Session Expired/Error")
        }
    }catch(error){
        throw error;
    }
}

const loginUser=async (email) => {
    try{
        console.log(email)
        const result = await cassandraClient.execute(verifyUserStmt,[email],{prepare:true});
        console.log(result)
        if(result.rowLength){
            return result.rows[0];
        }else{
            throw new Error("Invalid Credentials")
        }
    }catch(error){
        console.log(error)
        throw new Error("Invalid Credentials")
    }
}
module.exports = {
    getUserFromList,
    getUsersPublic,
    userSignUp,
    getUser,
    loginUser
}
