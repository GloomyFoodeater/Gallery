const model = require('./../model/users');
const {BAD_REQUEST} = require("../const/http_codes");
const {authorize} = require("./sessionController");

async function createUser(req, res) {
    try {
        await model.createUser();
        await authorize(req, res);
    } catch (e) {
        res.status(BAD_REQUEST).json({message: "Не удалось создать пользователя"});
    }
}

module.exports = {createUser};