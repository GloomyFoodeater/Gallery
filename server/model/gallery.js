const {getConnection} = require('./../db');

async function getImages() {
    const [data, _fields] = await getConnection().execute('SELECT * FROM image ORDER BY id ASC');
    return data;
}

async function getImage(id) {
    const [data, _fields] = await getConnection().execute(`SELECT * FROM image WHERE id=${id}`);
    return data[0];
}

async function addImage(image) {
    const dotIndex = image.originalname.indexOf('.')
    const name = image.originalname.slice(0, dotIndex)
    const extension = image.originalname.slice(dotIndex + 1)
    const prefix = 'uploads\\'
    const uuid = image.path.slice(image.path.indexOf(prefix) + prefix.length)
    await getConnection().execute(`INSERT INTO image (uuid, name, extension) VALUES ('${uuid}', '${name}', '${extension}')`)
}

async function deleteImage(id) {
    await getConnection().execute(`DELETE FROM image WHERE id=${id}`);
}

async function moveImage(imageId, albumId) {
    await getConnection().execute(`UPDATE image SET album_id=${albumId} WHERE id=${imageId}`);
}

async function getAlbums() {
    const [data, _fields] = await getConnection().execute('SELECT * FROM album ORDER BY id ASC');
    return data;
}

async function getAlbum(id) {
    const [albums, _albumsFields] = await getConnection().execute(`SELECT * FROM album WHERE id=${id}`);
    const [images, _imagesFields] = await getConnection().execute(`SELECT * FROM image WHERE album_id=${id} ORDER BY id ASC`);
    return {id, name: albums[0].name, images};
}

async function addAlbum(name) {
    await getConnection().execute(`INSERT album (name) VALUES ('${name}')`);
}

async function deleteAlbum(id) {
    await getConnection().execute(`DELETE FROM album WHERE id=${id}`);
}

module.exports = {
    getImages, getImage, addImage, deleteImage, moveImage, getAlbums, getAlbum, addAlbum, deleteAlbum,
}
