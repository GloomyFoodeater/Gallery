const model = require('./../model/users');
const {BAD_REQUEST} = require("../const/http_codes");
const {authorize} = require("./sessionController");

const ER_DUP_ENTRY = 1062;

async function createUser(req, res) {
    try {
        await model.createUser(req.body);
        await authorize(req, res);
    } catch (e) {
        const message = e.errno === ER_DUP_ENTRY ? "Логин занят другим пользователем" : "Не удалось создать пользователя";
        res.status(BAD_REQUEST).json({message});
    }
}

module.exports = {createUser};