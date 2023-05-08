const express = require('express');
const {addAlbum, deleteAlbums, getAlbum, getAlbums, updateAlbum} = require("../controller/albumsController");

module.exports = express.Router()
    .get('/', getAlbums)
    .get('/:id', getAlbum)
    .post('/', addAlbum)
    .put('/:id', updateAlbum)
    .delete('/', deleteAlbums);