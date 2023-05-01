async function start() {
    const express = require('express');
    const multer = require('multer')({dest: 'uploads'});
    const bodyParser = require('body-parser');
    const galleryController = require('./controller/galleryController');

    const PORT = 5000;
    const app = express();

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.get('/images', galleryController.getImages);

    app.get('/images/:id', galleryController.getImage);

    app.post('/images', multer.array('image-input'), galleryController.addImages);

    app.delete('/images', galleryController.deleteImages);

    app.get('/albums', galleryController.getAlbums);

    app.get('/albums/:id', galleryController.getAlbum);

    app.put('/albums', galleryController.addAlbum);

    app.put('/albums/:id', galleryController.moveImages);

    app.delete('/albums', galleryController.deleteAlbums);

    app.put('/sort-filter', galleryController.changeSortAndFilter);

    app.listen(PORT, () => {
        console.log(`[listen] on port ${PORT}`);
    });

}

start();
