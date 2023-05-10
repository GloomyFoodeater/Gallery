const {verify, TokenExpiredError} = require('jsonwebtoken');
const {getUserById} = require('./../model/users')
const {resetAccessToken} = require("../utils/cookie");
const NotAuthorizedError = require('../errors/NotAuthorizedError');
const NotFoundError = require('../errors/NotFoundError');

module.exports = async function (req, res, next) {
    // Preflight requests
    if (req.method === "OPTIONS") {
        next();
        return;
    }

    let userId, user, error;
    try {
        const {token} = req.cookies;
        userId = verify(token, process.env.TOKEN_SECRET).userId;
        user = await getUserById(userId);
        if (!user) error = new NotFoundError("Пользователь не найден");
        else req.userId = userId;
    } catch (e) {
        let message;
        if (e instanceof TokenExpiredError) {
            resetAccessToken(res);
            message = "Время действия сессии истекло";
        } else message = "Необходима авторизация";
        error = new NotAuthorizedError(message);
    }
    next(error);
}