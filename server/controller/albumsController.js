const gallery = require('./../model/gallery');
const BadRequestError = require('./../errors/BadRequestError');

async function getAlbums(req, res, next) {
    try {
        const albums = await gallery.getAlbums(req.userId);
        res.json(albums);
    } catch (e) {
        next(e);
    }
}

async function getAlbum(req, res, next) {
    try {
        const album = await gallery.getAlbum(req.userId, req.params.id);
        res.json(album);
    } catch (e) {
        next(e);
    }
}

async function addAlbum(req, res, next) {
    try {
        const name = req.body.name;
        await gallery.addAlbum(req.userId, name);
        res.end();
    } catch (e) {
        next(e);
    }
}

async function deleteAlbums(req, res, next) {
    try {
        req.body.forEach(id => gallery.deleteAlbum(req.userId, id));
        res.end();
    } catch {
        next(new BadRequestError("Некорректно десереализовано выделение")); // TypeError from body.forEach
    }
}

async function updateAlbum(req, res, next) {
    try {
        const albumId = req.params.id;
        req.body.forEach(imageId => gallery.moveImage(req.userId, imageId, albumId));
        res.end();
    } catch {
        next(new BadRequestError("Некорректно десереализовано выделение")); // TypeError from body.forEach
    }
}

module.exports = {
    updateAlbum, getAlbums, getAlbum, addAlbum, deleteAlbums
}