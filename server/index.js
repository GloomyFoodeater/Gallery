async function start() {
    const express = require('express');
    const multer = require('multer')({dest: 'uploads'});
    const bodyParser = require('body-parser');
    const galleryController = require('./controller/galleryController');

    const PORT = 3001;
    const app = express();

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.get('/', galleryController.getImages);

    app.get('/images/:id', galleryController.getImage);

    app.get('/images/:id/download', galleryController.downloadImage);

    app.post('/images', multer.array('image-input'), galleryController.postImages);

    app.delete('/images', galleryController.deleteImages);

    app.get('/albums', galleryController.getAlbums);

    app.get('/albums/:id', galleryController.getAlbum);

    app.post('/albums', galleryController.postAlbum);

    app.delete('/albums/:id', galleryController.deleteAlbum);

    app.put('/sort-and-filter', galleryController.putSortAndFilter);

    app.listen(PORT, () => {
        console.log(`[listen] on port ${PORT}`);
    });

}

start();
