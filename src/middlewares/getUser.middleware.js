const { getUserFromList, getUser } = require("../services/user.service");

/**
 * Middleware to fetch user information based on user ID from the list.
 * @param {*} req - The request object.
 * @param {*} res - The response object.
 * @param {*} next - The next middleware function in the stack.
 */
const getUserMiddleware = async (req, res, next) => {
    try {
        // const userId = parseInt(req.params.id);
        // const user = await getUserFromList(userId);
        const userId = req.params.id;
        const user = await getUser(userId);
        if (user instanceof Error) {
            throw user.message;
        }

        req.userId = userId;
        req.email = user.email;
        req.name = user.name;
        next();
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    getUserMiddleware
}