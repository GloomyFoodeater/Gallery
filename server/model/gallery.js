const moment = require('moment');
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

init();

const availableSortOrders = new Set(['ASC', 'DESC']);
const availableSortFields = new Set(['name', 'lastUpdate']);
const availableFilters = new Set(['bmp', 'png', 'jpg', 'jpeg', 'gif', 'webp']);

let state = {
    sortOrder: 'ASC',
    sortField: 'name',
    filters: availableFilters
}

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
    const now = moment().format('YYYY-MM-DD hh:mm:ss');
    connection.execute(`INSERT image VALUES ('${uuid}', '${name}', '${extension}', '${now}', NULL)`)
}

async function deleteImage(id) {
    connection.execute(`DELETE image WHERE id=${id}`);
}

function moveImage(imageId, albumId) {
    connection.execute(`UPDATE image SET albumId=${albumId} WHERE id=${imageId}`);
}

async function getAlbums() {
    const [data, _fields] = await connection.execute('SELECT * FROM album');
    return data;
}

async function getAlbum(id) {
    const [albums, _albumsFields] = await connection.execute(`SELECT * FROM album WHERE id=${id}`);
    const [images, _imagesFields] = await connection.execute(`SELECT * FROM image WHERE album_id=${id}`);
    return {name: albums[0].name, images};
}

async function addAlbum(name) {
    await connection.execute(`INSERT album VALUES ('${name}')`);
}

async function deleteAlbum(id) {
    await connection.execute(`DELETE album WHERE id=${id}`);
}

function setSortAndFilter({sortOrder, sortField, filters}) {

    if (!availableSortOrders.has(sortOrder))
        throw new Error('Invalid sort order');

    if (!availableSortFields.has(sortField))
        throw new Error('Invalid sort field');

    const invalidFilters = filters.filter(filter => !availableFilters.has(filter));
    if (invalidFilters)
        throw new Error(`Invalid filters: ${invalidFilters}`);

    state = {sortOrder, sortField, filters};
}

module.exports = {
    getImages, getImage, addImage, deleteImage,
    moveImage,
    getAlbums, getAlbum, addAlbum, deleteAlbum,
    setSortAndFilter

}
