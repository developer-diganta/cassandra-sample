const jwt = require("jsonwebtoken")
const verifyJWTMiddleware = async (req,res,next) => {
    try{
        const decoded =  jwt.verify(req.cookies.token,process.env.SECRET);
        req.id=decoded.id;
        req.email=decoded.email;
        next();
    }catch(error){
        res.status(400).send(error.message);
    }
}

module.exports = verifyJWTMiddleware;