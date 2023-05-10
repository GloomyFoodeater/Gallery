const gallery = require('../../../model/gallery');
const path = require('path');
const BadRequestError = require('../../../errors/BadRequestError')
const NotFoundError = require("../../../errors/NotFoundError");

async function getImages(req, res, next) {
    try {
        const images = await gallery.getImages(req.userId);
        res.json(images);
    } catch (e) {
        next(e);
    }
}

async function getImage(req, res, next) {
    try {
        const {uuid, name, extension} = await gallery.getImage(req.userId, req.params.id);
        const filePath = path.resolve(__dirname + '../../../uploads/' + uuid);
        const fileName = name + '.' + extension;
        if (req["Content-Disposition"] === "inline")
            res.sendFile(filePath);
        else
            res.download(filePath, fileName)
    } catch (e) {
        if (e instanceof TypeError) e = new NotFoundError("Изображение не найдено");
        next(e);
    }
}

async function addImages(req, res, next) {
    try {
        req.files.forEach(image => gallery.addImage(req.userId, image));
        res.end();
    } catch {
        next(new BadRequestError("Некорректно десереализовано выделение"));
    }
}

async function deleteImages(req, res, next) {
    try {
        req.body.forEach(id => gallery.deleteImage(req.userId, id));
        res.end();
    } catch {
        next(new BadRequestError("Некорректно десереализовано выделение"));
    }
}

module.exports = {
    getImages, getImage, addImages, deleteImages
}