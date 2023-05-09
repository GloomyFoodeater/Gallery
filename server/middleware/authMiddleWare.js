const {verify, TokenExpiredError} = require('jsonwebtoken');
const {NOT_AUTHORIZED} = require("../const/http_codes");
const {getUserById} = require('./../model/users')
const {resetAccessToken} = require("../utils/cookie");

module.exports = async function (req, res, next) {
    // Preflight requests
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const {token} = req.cookies;
        const {userId} = verify(token, process.env.TOKEN_SECRET);
        if (await getUserById(userId)) {
            req.userId = userId;
            next();
        } else {
            res.status(NOT_AUTHORIZED).json({message: "Пользователь не найден"});
        }
    } catch (e) {
        let message;
        if (e instanceof TokenExpiredError) {
            resetAccessToken(res);
            message = "Время действия сессии истекло";
        } else message = "Необходима авторизация";
        res.status(NOT_AUTHORIZED).json({message});
    }
}