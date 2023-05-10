const {INTERNAL_SERVER_ERROR} = require("../const/http_codes");
const ApiError = require('./ApiError')
module.exports = class ForbiddenError extends ApiError {
    constructor(message, dbErrCode, query) {
        super(INTERNAL_SERVER_ERROR, message);
        this.dbErrCode = dbErrCode;
        this.query = query;
        this.name = this.constructor.name;
    }
}