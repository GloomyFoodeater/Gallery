const {BAD_REQUEST} = require("../const/http_codes");
const ApiError = require('./ApiError')
module.exports = class BadRequestError extends ApiError {
    constructor(message) {
        super(BAD_REQUEST, message);
        this.name = this.constructor.name;
    }
}