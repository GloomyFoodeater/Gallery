const {sign} = require("jsonwebtoken");
const {getUserByPair} = require('./../model/users');
const {NOT_AUTHORIZED, BAD_REQUEST} = require("../const/http_codes");
const {resetAccessToken} = require("../utils/cookie");

function generateAccessToken(userId) {
    const expiresIn = process.env.EXPIRATION_PERIOD + 's';
    return sign({userId}, process.env.TOKEN_SECRET, {expiresIn});
}

async function authorize(req, res) {
    try {
        const user = await getUserByPair(req.body);
        if (user) {
            const token = generateAccessToken(user.id);
            res.cookie(process.env.ACCESS_TOKEN, token, {
                httpOnly: true,
                maxAge: process.env.EXPIRATION_PERIOD * 1000
            }).end();
        } else {
            res.status(NOT_AUTHORIZED).json({message: "Пользователь не найден"});
        }
    } catch (e) {
        console.log(e);
        res.status(BAD_REQUEST).json({message: "Не указаны логин и пароль"});
    }
}

async function logout(req, res) {
    resetAccessToken(res);
    res.end();
}

module.exports = {authorize, logout};