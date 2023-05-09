const {sign} = require("jsonwebtoken");
const {getUser} = require('./../model/users');
const {NOT_AUTHORIZED} = require("../const/http_codes");
const {EXPIRATION_PERIOD} = require("./../const/time")

function generateAccessToken(user) {
    return sign(user, process.env.TOKEN_SECRET, {expiresIn: EXPIRATION_PERIOD});
}

async function authorize(req, res) {
    if (await getUser(req.body)) {
        const token = generateAccessToken(req.body);
        res.cookie('token', token, {httpOnly: true, maxAge: EXPIRATION_PERIOD * 1000}).end();
    } else {
        res.status(NOT_AUTHORIZED).json({message: "Пользователь не найден"});
    }
}

async function logout(req, res) {
    res.cookie('token', '', {expires: new Date()});
    res.end();
}

module.exports = {authorize, logout};