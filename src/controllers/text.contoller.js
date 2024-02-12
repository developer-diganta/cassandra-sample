const { getUserTexts } = require("../services/text.service")

const userTexts = async (req,res) => {
    try{
        const userTexts = await getUserTexts(req.userId);
        res.send(userTexts);
    }catch(error){
        res.send(error);
    }
}


module.exports = userTexts;