// TODO: Implement fetches
export async function getImages() {
    const images = [
        {id: 1, name: "hello"},
        {id: 2, name: 2},
        {id: 3, name: 3},
        {id: 4, name: 4},
        {id: 5, name: 5}
    ];
    return Promise.resolve(images);
}

export async function getImage(id) {

}

export async function downloadImage(id) {

}

export async function postImages(images) {

}

export async function deleteImages(selection) {
    console.log(selection);
}

export async function moveImages(selection, album) {

}

export async function getAlbums() {
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

export async function deleteAlbums(selection) {
    console.log(selection);
}

export async function setSortAndFilter({sortOrder, sortField, filters}) {

}