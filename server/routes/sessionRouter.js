const express = require('express');
const {authorize, logout} = require('../controller/sessionController');

module.exports = express.Router()
    .post('/', authorize)
    .delete('/', logout);