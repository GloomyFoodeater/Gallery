const gallery = require('./../model/gallery');
const path = require('path');
const {NOT_FOUND, BAD_REQUEST} = require("../const/http_codes");

async function getImages(req, res) {
    try {
        const token = req.cookies[process.env.ACCESS_TOKEN];
        const images = await gallery.getImages();
        res.json(images);
    } catch (e) {
        console.log(e);
        res.status(NOT_FOUND).end();
    }
}

async function getImage(req, res) {
    try {
        const {uuid, name, extension} = await gallery.getImage(req.params.id);
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
        req.files.forEach(image => gallery.addImage(image).catch(console.log));
        res.end();
    } catch (e) {
        console.log(e);
        res.status(BAD_REQUEST).end();
    }
}

async function deleteImages(req, res) {
    try {
        req.body.forEach(id => gallery.deleteImage(id).catch(console.log));
        res.end();
    } catch (e) {
        console.log(e);
        res.status(BAD_REQUEST).end();
    }
}

module.exports = {
    getImages, getImage, addImages, deleteImages
}