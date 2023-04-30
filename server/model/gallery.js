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

export async function getImages() {
    const [data, _fields] = await connection.execute('SELECT * FROM image');
    return data;
}

export async function getImage(id) {
    const [data, _fields] = await connection.execute(`SELECT * FROM image WHERE id=${id}`);
    return data[0];
}

export async function postImage(image) {
    const dotIndex = image.originalname.indexOf('.')
    const name = image.originalname.slice(0, dotIndex)
    const extension = image.originalname.slice(dotIndex + 1)
    const prefix = 'uploads\\'
    const uuid = image.path.slice(image.path.indexOf(prefix) + prefix.length)
    const now = moment().format('YYYY-MM-DD hh:mm:ss');
    connection.execute(`INSERT image VALUES ('${uuid}', '${name}', '${extension}', '${now}', NULL)`)
}

export async function deleteImage(id) {
    connection.execute(`DELETE image WHERE id=${id}`);
}

export function moveImage(imageId, albumId) {
    connection.execute(`UPDATE image SET albumId=${albumId} WHERE id=${imageId}`);
}

export async function getAlbums() {
    const [data, _fields] = await connection.execute('SELECT * FROM albums');
    return data;
}

export async function getAlbum(id) {
    const [albums, _albumsFields] = await connection.execute(`SELECT * FROM albums WHERE id=${id}`);
    const [images, _imagesFields] = await connection.execute(`SELECT * FROM images WHERE albumId=${id}`);
    return {name: albums[0].name, images};
}

export async function postAlbum(name) {
    await connection.execute(`INSERT album VALUES ('${name}')`);
}

export async function deleteAlbum(id) {
    await connection.execute(`DELETE album WHERE id=${id}`);
}

export function setSortAndFilter({sortOrder, sortField, filters}) {

    if (!availableSortOrders.has(sortOrder))
        throw new Error('Invalid sort order');

    if (!availableSortFields.has(sortField))
        throw new Error('Invalid sort field');

    const invalidFilters = filters.filter(filter => !availableFilters.has(filter));
    if (invalidFilters)
        throw new Error(`Invalid filters: ${invalidFilters}`);

    state = {sortOrder, sortField, filters};
}
