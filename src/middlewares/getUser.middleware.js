const { getUserFromList } = require("../services/user.service");

const getUserMiddleware = async (req,res,next) => {
    try{
        const userId = parseInt(req.params.id);
    
        const user = await getUserFromList(userId);
        if(user instanceof Error){
            throw user.message;
        }
        req.userId = userId;
        next();
    }catch(error){
        res.status(400).send(error);
    }
    
}

module.exports = {
    getUserMiddleware
}