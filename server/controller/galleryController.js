const gallery = require('./../model/gallery');
const path = require('path');

async function getImages(_req, res) {
    try {
        const images = await gallery.getImages();
        res.json(images);
    } catch (e) {
        console.log(e);
        res.status(404).send('Not found');
    }
}

async function getImage(req, res) {
    try {
        const {uuid} = await gallery.getImage(req.params.id);
        const filePath = path.resolve(__dirname + '/../uploads/' + uuid);
        res.sendFile(filePath);
    } catch (e) {
        console.log(e);
        res.status(404).send('Not found');
    }
}

async function downloadImage(req, res) {
    try {
        const {extension, name, uuid} = await gallery.getImage(req.params.id);
        const filePath = path.resolve(__dirname + '/../uploads/' + uuid);
        const fileName = name + '.' + extension;
        res.download(filePath, fileName);
    } catch (e) {
        console.log(e);
        res.status(404).send('Not found');
    }
}

async function postImages(req, res) {
    req.files.forEach(image => gallery.postImage(image).catch(console.log));
    res.end();
}

async function deleteImages(req, res) {
    // Object.keys(req.body).forEach(id => gallery.deleteImage(id).catch(console.log));
    req.body.forEach(id => gallery.deleteImage(id).catch(console.log));
    res.end();
}

async function getAlbums(req, res) {
    try {
        const albums = await gallery.getAlbums();
        res.json(albums);
    } catch (e) {
        console.log(e);
        res.status(404).send('Not found');
    }
}

async function getAlbum(req, res) {
    try {
        const images = await gallery.getAlbum(req.params.id);
        res.json(images);
    } catch (e) {
        console.log(e);
        res.status(404).send('Not found');
    }
}

async function postAlbum(req, res) {
    try {
        const name = req.body.name;
        await gallery.postAlbum(name);
        res.end();
    } catch (e) {
        console.log(e);
        res.status(500).send('Failed to add album');
    }
}

async function deleteAlbum(req, res) {
    try {
        const id = req.params.id;
        await gallery.deleteAlbum(id);
        res.end();
    } catch (e) {
        console.log(e);
        res.status(404).send('Failed to delete album');
    }
}

function putSortAndFilter(req, res) {
    try {
        gallery.setSortAndFilter(...req.body)
        res.end();
    } catch (e) {
        console.log(e);
        res.status(500).send('Failed to set sort and filter');
    }
}

module.exports = {
    getImages,
    getImage,
    downloadImage,
    postImages,
    deleteImages,
    getAlbums,
    getAlbum,
    postAlbum,
    deleteAlbum,
    putSortAndFilter
};