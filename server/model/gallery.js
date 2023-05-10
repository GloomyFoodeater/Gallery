const {getConnection} = require('./../db');
const ForbiddenError = require("../errors/ForbiddenError");
const DatabaseError = require("../errors/DatabaseError");

async function getImages(userId) {
    try {
        const [data] = await getConnection().execute(`SELECT * FROM image WHERE user_id=${userId} ORDER BY id ASC`);
        return data;
    } catch (e) {
        throw new DatabaseError("Не удалось получить изображения", e.code, e.sql);
    }
}

async function getImage(userId, id) {
    try {
        const [data] = await getConnection().execute(`SELECT * FROM image WHERE id=${id} AND user_id=${userId}`);
        return data[0];
    } catch (e) {
        throw new DatabaseError("Не удалось получить изображение", e.code, e.sql);
    }
}

async function addImage(userId, image) {
    const dotIndex = image.originalname.indexOf('.')
    const name = image.originalname.slice(0, dotIndex)
    const extension = image.originalname.slice(dotIndex + 1)
    const prefix = 'uploads\\'
    const uuid = image.path.slice(image.path.indexOf(prefix) + prefix.length)

    await getConnection().execute(`INSERT INTO image (uuid, name, extension, user_id) VALUES ('${uuid}', '${name}', '${extension}', ${userId})`)
}

async function deleteImage(userId, id) {
    // AND prevents from cross-user movements
    await getConnection().execute(`DELETE FROM image WHERE id=${id} AND user_id=${userId}`);
}

async function moveImage(userId, imageId, albumId) {
    // AND prevents from cross-user movements
    await getConnection().execute(`UPDATE image SET album_id=${albumId} WHERE id=${imageId} AND user_id=${userId}`);
}

async function getAlbums(userId) {
    try {
        const [data] = await getConnection().execute(`SELECT * FROM album WHERE user_id=${userId} ORDER BY id ASC`);
        return data;
    } catch (e) {
        throw new DatabaseError("Не удалось получить альбомы", e.code, e.sql);
    }
}

async function getAlbum(userId, id) {
    try {
        const [albums] = await getConnection().execute(`SELECT * FROM album WHERE id=${id} AND user_id=${userId}`);
        const [images] = await getConnection().execute(`SELECT * FROM image WHERE album_id=${id} AND user_id=${userId} ORDER BY id ASC`);
        return {id, name: albums[0].name, images};
    } catch (e) {
        throw new DatabaseError("Не удалось получить альбом", e.code, e.sql);
    }
}

async function addAlbum(userId, name) {
    try {
        await getConnection().execute(`INSERT album (name, user_id) VALUES ('${name}', ${userId})`);
    } catch (e) {
        throw new DatabaseError("Не удалось добавить альбом", e.code, e.sql);
    }
}

async function deleteAlbum(userId, id) {
    // AND prevents from cross-user movements
    await getConnection().execute(`DELETE FROM album WHERE id=${id} AND user_id=${userId}`);
}

module.exports = {
    getImages, getImage, addImage, deleteImage, moveImage, getAlbums, getAlbum, addAlbum, deleteAlbum,
}
