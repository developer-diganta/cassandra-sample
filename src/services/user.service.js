const userList = require("../static/users.json");

const getUser = async (req,res,next) => {
    const userId = parseInt(req.params.id);

    const user = userList.find(obj => obj.uuid === userId);
    console.log(user)
    if(user){
        req.userId = userId;
        next();
    }else{
        res.status(404).send("No user found");
    }
}

module.exports = {
    getUser
}