const gallery = require('./../model/gallery');
const {NOT_FOUND, INTERNAL_SERVER_ERROR, BAD_REQUEST} = require("../const/http_codes");

async function getAlbums(req, res) {
    try {
        const albums = await gallery.getAlbums(req.userId);
        res.json(albums);
    } catch (e) {
        console.log(e);
        res.status(NOT_FOUND).end();
    }
}

async function getAlbum(req, res) {
    try {
        const images = await gallery.getAlbum(req.userId, req.params.id);
        res.json(images);
    } catch (e) {
        console.log(e);
        res.status(NOT_FOUND).end();
    }
}

async function addAlbum(req, res) {
    try {
        const name = req.body.name;
        await gallery.addAlbum(req.userId, name);
        res.end();
    } catch (e) {
        console.log(e);
        res.status(INTERNAL_SERVER_ERROR).end();
    }
}

async function deleteAlbums(req, res) {
    try {
        req.body.forEach(id => gallery.deleteAlbum(req.userId, id).catch(console.log));
        res.end();
    } catch (e) {
        console.log(e);
        res.status(BAD_REQUEST).end();
    }
}

async function updateAlbum(req, res) {
    try {
        const albumId = req.params.id;
        req.body.forEach(imageId => gallery.moveImage(req.userId, imageId, albumId).catch(console.log));
        res.end();
    } catch (e) {
        console.log(e);
        res.status(BAD_REQUEST).end();
    }
}

module.exports = {
    updateAlbum, getAlbums, getAlbum, addAlbum, deleteAlbums
}