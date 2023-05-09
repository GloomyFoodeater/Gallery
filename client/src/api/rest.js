function isJson(response) {
    // response.bodyUsed is false on empty arrays
    return response.headers.get('Content-Type')?.includes("application/json");
}

async function fetchWrapper(url, options) {
    const response = await fetch(url, options);
    if (response.status !== 200) {
        const {message} = await response.json();
        throw new Error(message);
    }
    if (isJson(response)) return await response.json();
}

export async function getImages() {
    const url = process.env.REACT_APP_API_URL + "/images";
    const options = {method: "GET", credentials: 'include'};

    return await fetchWrapper(url, options);
}

export async function postImages(files) {
    const url = process.env.REACT_APP_API_URL + "/images";
    const body = new FormData();
    for (const file of files)
        body.append('image-input', file, file.name);
    const options = {method: "POST", credentials: 'include', body};

    return await fetchWrapper(url, options);
}

export async function deleteImages(selection) {
    const url = process.env.REACT_APP_API_URL + "/images";
    const body = JSON.stringify([...selection]);
    const headers = {"Content-Type": "application/json"};
    const options = {method: "DELETE", credentials: 'include', headers, body};

    return await fetchWrapper(url, options);
}

export async function moveImages(selection, id) {
    const url = process.env.REACT_APP_API_URL + `/albums/${id}`;
    const body = JSON.stringify([...selection]);
    const headers = {"Content-Type": "application/json"};
    const options = {method: "PUT", credentials: 'include', headers, body};

    return await fetchWrapper(url, options);
}

export async function getAlbums() {
    const url = process.env.REACT_APP_API_URL + "/albums";
    const options = {method: "GET", credentials: 'include'};

    return await fetchWrapper(url, options);
}

export async function getAlbum(id) {
    const url = process.env.REACT_APP_API_URL + `/albums/${id}`;
    const options = {method: "GET", credentials: 'include'};

    return await fetchWrapper(url, options);
}

export async function addAlbum(name) {
    if (!name)
        throw new Error('Имя альбома не должно быть пустым');
    const url = process.env.REACT_APP_API_URL + "/albums";
    const headers = {"Content-Type": "application/json"};
    const body = JSON.stringify({name});
    const options = {method: "POST", credentials: 'include', headers, body};

    return await fetchWrapper(url, options);
}

export async function deleteAlbums(selection) {
    const url = process.env.REACT_APP_API_URL + "/albums";
    const headers = {"Content-Type": "application/json"};
    const body = JSON.stringify([...selection]);
    const options = {method: "DELETE", credentials: 'include', headers, body};

    return await fetchWrapper(url, options);
}

export async function signUp(user) {
    if (!user.login || !user.password)
        throw new Error('Логин и пароль не должны быть пустыми');

    const url = process.env.REACT_APP_API_URL + "/users";
    const headers = {"Content-Type": "application/json"};
    const body = JSON.stringify(user);

    // Server authorizes => include credentials
    const options = {method: "POST", credentials: 'include', headers, body};

    return await fetchWrapper(url, options);
}

export async function signIn(login, password) {
    if (!login || !password)
        throw new Error('Логин и пароль не должны быть пустыми');

    const user = {login, password};
    const url = process.env.REACT_APP_API_URL + "/session";
    const headers = {"Content-Type": "application/json"};
    const body = JSON.stringify(user);
    const options = {method: "POST", headers, credentials: 'include', body};

    return await fetchWrapper(url, options);
}

export async function signOut() {
    const url = process.env.REACT_APP_API_URL + "/session";
    const options = {method: "DELETE", credentials: 'include'};

    return await fetchWrapper(url, options);
}