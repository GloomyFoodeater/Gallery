const express = require('express');
const {createUser} = require('../controller/usersController');

module.exports = express.Router()
    .post('/', createUser);