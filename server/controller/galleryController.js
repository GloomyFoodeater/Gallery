const gallery = require('./../model/gallery');
const path = require('path');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

async function getImages(_req, res) {
    try {
        const images = await gallery.getImages();
        res.json(images);
    } catch (e) {
        console.log(e);
        res.status(NOT_FOUND).end();
    }
}

async function getImage(req, res) {
    try {
        const {uuid} = await gallery.getImage(req.params.id);
        const filePath = path.resolve(__dirname + '/../uploads/' + uuid);
        res.sendFile(filePath);
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

async function moveImages(req, res) {
    const albumId = req.params.id;
    try {
        req.body.forEach(imageId => gallery.moveImage(imageId, albumId)).catch(console.log);
        res.end();
    } catch (e) {
        console.log(e);
        res.status(BAD_REQUEST).end();
    }
}

async function getAlbums(req, res) {
    try {
        const albums = await gallery.getAlbums();
        res.json(albums);
    } catch (e) {
        console.log(e);
        res.status(NOT_FOUND).end();
    }
}

async function getAlbum(req, res) {
    try {
        const images = await gallery.getAlbum(req.params.id);
        res.json(images);
    } catch (e) {
        console.log(e);
        res.status(NOT_FOUND).end();
    }
}

async function addAlbum(req, res) {
    try {
        const name = req.body.name;
        await gallery.addAlbum(name);
        res.end();
    } catch (e) {
        console.log(e);
        res.status(INTERNAL_SERVER_ERROR).end();
    }
}

async function deleteAlbums(req, res) {
    try {
        req.body.forEach(id => gallery.deleteAlbum(id).catch(console.log));
        res.end();
    } catch (e) {
        console.log(e);
        res.status(BAD_REQUEST).end();
    }
}

function changeSortAndFilter(req, res) {
    try {
        gallery.setSortAndFilter(...req.body)
        res.end();
    } catch (e) {
        console.log(e);
        res.status(BAD_REQUEST).end();
    }
}

module.exports = {
    getImages, getImage, addImages, deleteImages,
    moveImages,
    getAlbums, getAlbum, addAlbum, deleteAlbums,
    changeSortAndFilter
}