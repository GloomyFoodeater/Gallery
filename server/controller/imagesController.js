const gallery = require('./../model/gallery');
const path = require('path');
const {NOT_FOUND, BAD_REQUEST} = require("../const/http_codes");

async function getImages(req, res) {
    try {
        const images = await gallery.getImages(req.userId);
        res.json(images);
    } catch (e) {
        console.log(e);
        res.status(NOT_FOUND).end();
    }
}

async function getImage(req, res) {
    try {
        const {uuid, name, extension} = await gallery.getImage(req.userId, req.params.id);
        const filePath = path.resolve(__dirname + '/../uploads/' + uuid);
        const fileName = name + '.' + extension;
        if (req["Content-Disposition"] === "inline")
            res.sendFile(filePath);
        else
            res.download(filePath, fileName)
    } catch (e) {
        console.log(e);
        res.status(NOT_FOUND).end();
    }
}


async function addImages(req, res) {
    try {
        req.files.forEach(image => gallery.addImage(req.userId, image).catch(console.log));
        res.end();
    } catch (e) {
        console.log(e);
        res.status(BAD_REQUEST).end();
    }
}

async function deleteImages(req, res) {
    try {
        req.body.forEach(id => gallery.deleteImage(req.userId, id).catch(console.log));
        res.end();
    } catch (e) {
        console.log(e);
        res.status(BAD_REQUEST).end();
    }
}

module.exports = {
    getImages, getImage, addImages, deleteImages
}