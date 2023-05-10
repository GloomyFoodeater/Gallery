const {sign, JsonWebTokenError} = require("jsonwebtoken");
const {getUserByPair} = require('./../model/users');
const {resetAccessToken} = require("../utils/cookie");
const NotFoundError = require("../errors/NotFoundError");

async function authorize(req, res) {
    const user = await getUserByPair(req.body);
    if(!user) throw new NotFoundError("Пользователь не найден");
    const expiresIn = process.env.EXPIRATION_PERIOD + 's';
    const token = sign({userId: user.id}, process.env.TOKEN_SECRET, {expiresIn});
    res.cookie(process.env.ACCESS_TOKEN, token, {
        httpOnly: true,
        maxAge: process.env.EXPIRATION_PERIOD * 1000
    }).end();
}

function logout(req, res) {
    resetAccessToken(res);
    res.end();
}

module.exports = {authorize, logout};