const { checkTextAuthor } = require("../services/text.service");

const checkTextAuthorMiddleware = async (req,res,next) => {
    try{
        const userId = req.userId;
        const textId = req.body.textId;
        const result = await checkTextAuthor(userId,textId);
        if(result instanceof Error){
            throw result;
        }
        next();
    }catch(error){
        res.status(400).send(error.message);
    }
}

module.exports = checkTextAuthorMiddleware;