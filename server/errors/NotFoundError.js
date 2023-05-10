const {NOT_FOUND} = require("../const/http_codes");
const ApiError = require('./ApiError')
module.exports = class NotFoundError extends ApiError {
    constructor(message) {
        super(NOT_FOUND, message);
        this.name = this.constructor.name;
    }
}