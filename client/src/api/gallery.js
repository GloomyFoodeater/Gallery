export async function getImages() {
    const url = process.env.REACT_APP_API_URL + "/images";
    const options = {method: "GET"};
    const response = await fetch(url, options);
    return await response.json();
}

export async function getImage(id) {
    const url = process.env.REACT_APP_API_URL + `/images/${id}`;
    const options = {method: "GET"};
    const response = await fetch(url, options);
    return await response.json();
}

export async function postImages(files) {
    const url = process.env.REACT_APP_API_URL + "/images";
    const body = new FormData();
    for (const file of files)
        body.append('image-input', file, file.name);
    const options = {method: "POST", body};
    await fetch(url, options);
}

export async function deleteImages(selection) {
    const url = process.env.REACT_APP_API_URL + "/images";
    const body = JSON.stringify([...selection]);
    const headers = {"Content-Type": "application/json"};
    const options = {method: "DELETE", headers, body};
    await fetch(url, options);
}

export async function moveImages(selection, id) {
    const url = process.env.REACT_APP_API_URL + `/albums/${id}`;
    const body = JSON.stringify([...selection]);
    const headers = {"Content-Type": "application/json"};
    const options = {method: "PUT", headers, body};
    await fetch(url, options);
}

export async function getAlbums() {
    const url = process.env.REACT_APP_API_URL + "/albums";
    const options = {method: "GET"};
    const response = await fetch(url, options);
    return await response.json();
}

export async function getAlbum(id) {
    const url = process.env.REACT_APP_API_URL + `/albums/${id}`;
    const options = {method: "GET"};
    const response = await fetch(url, options);
    return await response.json();
}

export async function addAlbum(name) {
    if (!name)
        throw new Error('Invalid album name');
    const url = process.env.REACT_APP_API_URL + "/albums";
    const headers = {"Content-Type": "application/json"};
    const body = JSON.stringify({name});
    const options = {method: "POST", headers, body};
    await fetch(url, options);
}

export async function deleteAlbums(selection) {
    const url = process.env.REACT_APP_API_URL + "/albums";
    const body = JSON.stringify([...selection]);
    const headers = {"Content-Type": "application/json"};
    const options = {method: "DELETE", headers, body};
    await fetch(url, options);
}
