const bcrypt = require("bcrypt");
const SALTS = require("../configs/salts.config");

const userSignUpMiddleware = async (req,res,next) => {
    try{
        const user = req.body;
        user.password = await bcrypt.hash(user.password,SALTS);
        req.user=user;
        next();
    }catch(error){
        console.log(error)
        res.status(400).send(error.message);
    }
}

module.exports = userSignUpMiddleware;