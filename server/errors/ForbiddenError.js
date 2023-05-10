const {FORBIDDEN} = require("../const/http_codes");
const ApiError = require('./ApiError')
module.exports = class ForbiddenError extends ApiError {
    constructor(message) {
        super(FORBIDDEN, message);
        this.name = this.constructor.name;
    }
}