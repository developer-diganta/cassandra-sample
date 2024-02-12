const { getUserTexts, addUserTexts, editUserTexts } = require("../services/text.service")

const userTextsController = async (req,res) => {
    try{
        const userTexts = await getUserTexts(req.userId);
        res.status(200).send(userTexts);
    }catch(error){
        // console.log(error)
        res.status(400).send(error);
    }
}

const addUserTextsController = async (req,res) => {
    try{
        const addUserText = addUserTexts(req.userId, req.body.text);
        res.status(200).send("Data added successfully")
    }catch(error){
        res.status(400).send(error);
    }
}

const editTextController = async (req,res) => {
    try{
        const editedUserText = editUserTexts(req.textId, req.body.text,req.userId);
        res.status(200).send("Data edited successfully.")
    }catch(error){
        console.log(error)
        res.status(400).send(error);
    }
}

module.exports = {
    userTextsController,
    addUserTextsController,
    editTextController
};