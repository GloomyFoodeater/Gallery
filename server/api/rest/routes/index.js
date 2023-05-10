const express = require('express');
const auth = require("../../../middleware/auth");
const imagesRouter = require("./imagesRouter");
const albumsRouter = require("./albumsRouter");
const sessionRouter = require("./sessionRouter");
const usersRouter = require("./usersRouter");

module.exports = express.Router()
    .use('/images', auth, imagesRouter)
    .use('/albums', auth, albumsRouter)
    .use('/session', sessionRouter)
    .use('/users', usersRouter);