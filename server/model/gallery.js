const mysql = require('mysql2/promise');

let connection;

async function init() {
    const DB_HOST = 'localhost';
    const DB_USER = 'root';
    const DB_PASS = 'admin';
    const DB_NAME = 'gallery'
    connection = await mysql.createConnection({
        host: DB_HOST, user: DB_USER, password: DB_PASS, database: DB_NAME
    });

}

init().then();

async function getImages() {
    const [data, _fields] = await connection.execute('SELECT * FROM image');
    return data;
}

async function getImage(id) {
    const [data, _fields] = await connection.execute(`SELECT * FROM image WHERE id=${id}`);
    return data[0];
}

async function addImage(image) {
    const dotIndex = image.originalname.indexOf('.')
    const name = image.originalname.slice(0, dotIndex)
    const extension = image.originalname.slice(dotIndex + 1)
    const prefix = 'uploads\\'
    const uuid = image.path.slice(image.path.indexOf(prefix) + prefix.length)
    await connection.execute(`INSERT INTO image (uuid, name, extension) VALUES ('${uuid}', '${name}', '${extension}')`)
}

async function deleteImage(id) {
    await connection.execute(`DELETE FROM image WHERE id=${id}`);
}

async function moveImage(imageId, albumId) {
    await connection.execute(`UPDATE image SET albumId=${albumId} WHERE id=${imageId}`);
}

async function getAlbums() {
    const [data, _fields] = await connection.execute('SELECT * FROM album ORDER BY id ASC');
    return data;
}

async function getAlbum(id) {
    const [albums, _albumsFields] = await connection.execute(`SELECT * FROM album WHERE id=${id}`);
    const [images, _imagesFields] = await connection.execute(`SELECT * FROM image WHERE album_id=${id}`);
    return {id, name: albums[0].name, images};
}

async function addAlbum(name) {
    await connection.execute(`INSERT album (name) VALUES ('${name}')`);
}

async function deleteAlbum(id) {
    await connection.execute(`DELETE FROM album WHERE id=${id}`);
}

module.exports = {
    getImages, getImage, addImage, deleteImage,
    moveImage,
    getAlbums, getAlbum, addAlbum, deleteAlbum,
}
