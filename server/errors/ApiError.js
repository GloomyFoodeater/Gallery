const {INTERNAL_SERVER_ERROR} = require("../const/http_codes");

module.exports = class ApiError extends Error {
    constructor(status, message) {
        super(message || "Что-то пошло не так");
        this.status = parseInt(status) || INTERNAL_SERVER_ERROR;
        this.name = this.constructor.name;
    }
}
