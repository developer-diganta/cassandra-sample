const { userSignUp } = require("../services/user.service")

const userSignUpController = async (req,res,next) => {
    try{
        const result = await userSignUp(req.user);
        if(result instanceof Error){
            throw result;
        }
        req.user.id=result.id;
        next();
    }catch(error){
        res.status(400).send(error.message)
    }
}

module.exports = {
    userSignUpController
}