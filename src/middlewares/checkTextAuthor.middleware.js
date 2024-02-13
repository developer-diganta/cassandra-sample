const { checkTextAuthor } = require("../services/text.service");

/**
 * Middleware to check if the user is the author of a specific text.
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 * @param {*} next - The next middleware function in the stack.
 */
const checkTextAuthorMiddleware = async (req, res, next) => {
    try {
        const userId = req.userId;
        const textId = req.body.textId;
        const result = await checkTextAuthor(userId, textId);
        if (result instanceof Error) {
            throw result;
        }
        next();
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = checkTextAuthorMiddleware;