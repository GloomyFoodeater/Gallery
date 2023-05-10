const users = require('./../model/users');
const session = require("../model/session");
async function createUser(req, res, next) {
    try {
        await users.createUser(req.body);
        await session.authorize(req, res);
    } catch (e) {
        next(e);
    }
}

module.exports = {createUser};