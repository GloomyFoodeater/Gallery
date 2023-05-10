const ApiError = require('./../errors/ApiError');
const {INTERNAL_SERVER_ERROR} = require("../const/http_codes");

module.exports = function (err, req, res, _next) {
    console.log(err);
    if (err instanceof ApiError)
        return res.status(err.status).json({message: err.message})
    return res.status(INTERNAL_SERVER_ERROR).json({message: "Непредвиденная ошибка"})
}