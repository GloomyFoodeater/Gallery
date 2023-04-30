// TODO: Implement fetches
async function getImages() {
    const images = [
        {id: 1, name: "hello"},
        {id: 2, name: 2},
        {id: 3, name: 3},
        {id: 4, name: 4},
        {id: 5, name: 5}
    ];
    return Promise.resolve(images);
}

async function getImage() {

}

async function downloadImage() {

}

async function postImages() {

}

async function deleteImage() {

}

async function getAlbums() {
    const albums = [
        {id: 1, name: "hello"},
        {id: 2, name: "2"},
        {id: 3, name: "3"},
        {id: 4, name: "4"},
        {id: 5, name: "Hello"},
        {id: 6, name: "World"}
    ];
    return Promise.resolve(albums);
}

async function getAlbum() {
    const album = [
        {id: 4, name: 4},
        {id: 5, name: 5},
        {id: 6, name: 4},
        {id: 7, name: 5},
        {id: 8, name: 4},
        {id: 9, name: 5}
    ];
    return Promise.resolve(album);
}

async function setSortAndFilter() {

}

export {
    getImages,
    getImage,
    downloadImage,
    postImages,
    deleteImage,
    getAlbums,
    getAlbum,
    setSortAndFilter
}