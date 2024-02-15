const { getUserTexts, addUserTexts, editUserTexts, deleteUserTexts } = require("../services/text.service")

/**
 * Controller function to get texts belonging to the user.
 * @param {*} req - The request object containing user ID.
 * @param {*} res - The response object to send the user texts.
 */
const userTextsController = async (req, res) => {
    try {
        const userTexts = await getUserTexts(req.userId);
        res.status(200).send(userTexts);
    } catch (error) {
        console.log(error)

        res.status(400).send(error);
    }
}

/**
 * Controller function to add texts for the user.
 * @param {*} req - The request object containing user ID and text.
 * @param {*} res - The response object to send success message or error.
 */
const addUserTextsController = async (req, res) => {
    try {
        const addUserText = await addUserTexts(req.userId, req.body.text);
        res.status(200).send("Data added successfully");
    } catch (error) {
        res.status(400).send(error);
    }
}

/**
 * Controller function to edit a text belonging to the user.
 * @param {*} req - The request object containing user ID, text ID, and new text content.
 * @param {*} res - The response object to send success message or error.
 */
const editTextController = async (req, res) => {
    try {
        console.log(req.body.textId);
        const editedUserText = await editUserTexts(req.body.textId, req.body.text, req.userId);
        if (editedUserText instanceof Error) {
            throw editedUserText;
        }
        res.status(200).send("Data edited successfully.");
    } catch (error) {
        res.status(400).send(error);
    }
}

/**
 * Controller to delete a user text.
 * @param {*} req - The request object containing the text ID and user ID.
 * @param {*} res - The response object.
 */
const deleteTextController = async (req, res) => {
    try {
        const deletedUserText = await deleteUserTexts(req.body.textId, req.userId);
        if (deletedUserText instanceof Error) {
            throw deletedUserText;
        }
        res.status(200).send("Text Deleted Successfully");
    } catch (error) {
        res.status(400).send(error);
    }
}


module.exports = {
    userTextsController,
    addUserTextsController,
    editTextController,
    deleteTextController
};