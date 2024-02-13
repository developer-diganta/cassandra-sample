const { getUserFromList } = require("../services/user.service");

/**
 * Middleware to fetch user information based on user ID from the list.
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 * @param {*} next - The next middleware function in the stack.
 */
const getUserMiddleware = async (req, res, next) => {
    try {
        const userId = parseInt(req.params.id);
        const user = await getUserFromList(userId);
        if (user instanceof Error) {
            throw user.message;
        }
        req.userId = userId;
        next();
    } catch (error) {
        res.status(400).send(error);
    }
}


module.exports = {
    getUserMiddleware
}