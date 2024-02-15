const { userSignUp, loginUser } = require("../services/user.service")
const SALTS = require("../configs/salts.config");

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

const getUserController = async (req,res) => {
    try{
        res.status(200).send({
            name:req.name,
            email: req.email
        })
    }catch(error){
        res.status(400).send(error.message);
    }
}

const loginUserController = async (req,res) => {
    try{
    }catch(error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    userSignUpController,
    getUserController
}