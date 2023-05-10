const {NOT_AUTHORIZED} = require("../const/http_codes");
const ApiError = require('./ApiError')
module.exports = class NotAuthorizedError extends ApiError {
    constructor(message) {
        super(NOT_AUTHORIZED, message);
        this.name = this.constructor.name;
    }
}