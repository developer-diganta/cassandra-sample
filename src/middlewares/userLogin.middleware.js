const { loginUser } = require("../services/user.service");
const bcrypt = require("bcrypt");
const SALTS = require("../configs/salts.config");

const userLoginMiddleware = async (req,res,next)=>{
    try{
        console.log(req.body.email)
        const user = await loginUser(req.body.email);
        console.log("IIUUUI",user)
        const check = await bcrypt.compare(req.body.password, user.password);
        console.log(check)
        if(!check){
            throw new Error("Invalid Credentials")
        }
        req.user={}
        req.user.name=user.name;
        req.user.email=user.email;
        req.user.id=user.id.toString('hex');
        console.log(req.id)
        next();

    }catch(error){
        console.log(error)
        res.status(400).send(error.message)
    }
}

module.exports = userLoginMiddleware