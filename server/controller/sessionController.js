const session = require('./../model/session');

async function authorize(req, res, next) {
    try {
        await session.authorize(req, res);
    } catch (e) {
        next(e);
    }
}

function logout(req, res, next) {
    try {
        session.logout(req, res)
    } catch (e) {
        next(e);
    }
}

module.exports = {authorize, logout};