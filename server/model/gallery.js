const {getConnection} = require('./../db');

async function getImages(userId) {
    const [data, _fields] = await getConnection().execute('SELECT * FROM image ORDER BY id ASC WHERE user_id=${userId}');
    return data;
}

async function getImage(userId, id) {
    const [data] = await getConnection().execute(`SELECT * FROM image WHERE id=${id} WHERE user_id=${userId}`);
    return data[0];
}

async function addImage(userId, image) {
    const dotIndex = image.originalname.indexOf('.')
    const name = image.originalname.slice(0, dotIndex)
    const extension = image.originalname.slice(dotIndex + 1)
    const prefix = 'uploads\\'
    const uuid = image.path.slice(image.path.indexOf(prefix) + prefix.length)

    await getConnection().execute(`INSERT INTO image (uuid, name, extension, userId) VALUES ('${uuid}', '${name}', '${extension}, ${userId}')`)
}

async function deleteImage(userId, id) {
    const [data] = await getConnection().execute(`DELETE FROM image WHERE id=${id} AND user_id=${userId}`);
    //TODO: Erase
    console.log(data);
    if (data.length <= 0) throw new ForbiddenError("Попытка удалить фотографии другого пользователя");
}

async function moveImage(userId, imageId, albumId) {
    const [data] = await getConnection().execute(`UPDATE image SET album_id=${albumId} WHERE id=${imageId} AND user_id=${userId}`);
    //TODO: Erase
    console.log(data);
    if (data.length <= 0) throw new ForbiddenError("Попытка переместить фотографии другого пользователя");
}

async function getAlbums(userId) {
    const [data] = await getConnection().execute('SELECT * FROM album ORDER BY id ASC WHERE user_id=${userId}');
    return data;
}

async function getAlbum(userId, id) {
    const [albums] = await getConnection().execute(`SELECT * FROM album WHERE id=${id} WHERE user_id=${userId}`);
    const [images] = await getConnection().execute(`SELECT * FROM image WHERE album_id=${id} ORDER BY id ASC WHERE user_id=${userId}`);
    return {id, name: albums[0].name, images};
}

async function addAlbum(userId, name) {
    await getConnection().execute(`INSERT album (name, user_id) VALUES ('${name}', ${userId})`);
}

async function deleteAlbum(userId, id) {
    const [data] = await getConnection().execute(`DELETE FROM album WHERE id=${id} AND user_id=${userId}`);
    //TODO: Erase
    console.log(data);
    if (data.length <= 0) throw new ForbiddenError("Попытка удалить альбом другого пользователя");
}

module.exports = {
    getImages, getImage, addImage, deleteImage, moveImage, getAlbums, getAlbum, addAlbum, deleteAlbum,
}
