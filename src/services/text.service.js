const cassandraClient = require("../database/cassandraConnection");

const getUserTexts = async (userId) => {
    try{
        const query = 'SELECT content FROM texts WHERE user=? ';
        const result = await cassandraClient.execute(query, [userId], { prepare: true });
        return result.rows;
    }catch(error){
        throw error;
    }
}

module.exports = {
    getUserTexts
}