const express = require("express");
const {getImages, getImage, deleteImages, addImages} = require("../controller/imagesController");
const multer = require('multer')({dest: 'uploads'});

module.exports = express.Router()
    .get('/', getImages)
    .get('/:id', getImage)
    .post('/', multer.array('image-input'), addImages)
    .delete('/', deleteImages);