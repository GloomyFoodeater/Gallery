const gallery = require('../../../model/gallery');
const path = require('path');
const BadRequestError = require('../../../errors/BadRequestError')
const NotFoundError = require("../../../errors/NotFoundError");
const ApiError = require("../../../errors/ApiError");

async function getImages(req, res, next) {
    try {
        const images = await gallery.getImages(req.userId);
        res.json(images);
    } catch (e) {
        next(e);
    }
}

async function getImage(req, res, next) {
    const onCatch = (e) => {
        if (e) next(new NotFoundError("Изображение не найдено"))
    };
    try {
        const {uuid, name, extension} = await gallery.getImage(req.userId, req.params.id);
        const filePath = path.resolve(__dirname + '/../../../uploads/' + uuid);
        const fileName = name + '.' + extension;
        if (req["Content-Disposition"] === "inline")
            res.sendFile(filePath, onCatch);
        else
            res.download(filePath, fileName, onCatch);
    } catch (e) {
        if (e instanceof ApiError) next(e);
        else onCatch(e);
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