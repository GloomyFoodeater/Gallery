export async function getImages() {
    // TODO: Fetch images
    const images = [
        {id: 1, name: "hello", extension: "png"},
        {id: 2, name: 2, extension: "png"},
        {id: 3, name: 3, extension: "png"},
        {id: 4, name: 4, extension: "png"},
        {id: 5, name: 5, extension: "png"}
    ];
    return Promise.resolve(images);
}

export async function getImage(id) {
    // TODO: Fetch image
}

export async function postImages(images) {
    // TODO: Send files
}

export async function deleteImages(selection) {
    // TODO: Send selection
    console.log(selection);
}

export async function moveImages(selection, album) {
    // TODO: Send selection
}

export async function getAlbums() {
    // TODO: Fetch albums
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

export async function getAlbum(id) {
    // TODO: fetch album
    const album = [
        {id: 4, name: 4, extension: "png"},
        {id: 5, name: 5, extension: "png"},
        {id: 6, name: 4, extension: "png"},
        {id: 7, name: 5, extension: "png"},
        {id: 8, name: 4, extension: "png"},
        {id: 9, name: 5, extension: "png"}
    ];
    return Promise.resolve(album);
}

export async function deleteAlbums(selection) {
    // TODO: Send selection
    console.log(selection);
}

export async function setSortAndFilter({sortOrder, sortField, filters}) {
    // TODO: Send sort and filter object
}