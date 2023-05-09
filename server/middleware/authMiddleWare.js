const {verify} = require('jsonwebtoken');
const {NOT_AUTHORIZED} = require("../const/http_codes");
const {getUserById} = require('./../model/users')

module.exports = async function (req, res, next) {
    try {
        const userId = verify(req.cookies, process.env.TOKEN_SECRET);
        if (await getUserById(userId)) {
            req.userId = userId;
            next();
        } else {
            res.status(NOT_AUTHORIZED).json({message: "Пользователь не найден"});
        }
    } catch (e) {
        res.status(NOT_AUTHORIZED).json({message: "Необходима авторизация"});
    }
}