const {verify} = require('jsonwebtoken');
const {NOT_AUTHORIZED} = require("../const/http_codes");
const {getUser} = require('./../model/users')

module.exports = async function (req, res, next) {
    try {
        const {token} = req.cookies;
        const user = verify(token, process.env.TOKEN_SECRET);
        if (await getUser(user)) {
            req.user = user;
            next();
        } else {
            res.status(NOT_AUTHORIZED).json({message: "Пользователь не найден"});
        }
    } catch (e) {
        res.status(NOT_AUTHORIZED).json({message: "Необходима авторизация"});
    }
}