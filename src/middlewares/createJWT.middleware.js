const jwt = require("jsonwebtoken");

const createJWTMiddleware = async (req,res) => {
    try{
        const token = jwt.sign({
            id:req.user.id,
            email: req.user.email
        }, process.env.SECRET,{ expiresIn: '6h' });
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
        res.status(200).send({
            id:req.user.id,
            email: req.user.email
        });
    }catch(error){
        res.status(400).send(error.message)
    }
}

module.exports = createJWTMiddleware;