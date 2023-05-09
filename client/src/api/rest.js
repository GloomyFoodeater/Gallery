async function fetchWrapperAsync(url, options) {
    const response = await fetch(url, options);

    // response.bodyUsed is false on empty arrays
    const contentType = response.headers.get('Content-Type');
    const contentLength = response.headers.get('Content-Length') ?? 0;
    const isJson = contentType?.includes("application/json") && contentLength > 0;

    if (response.status !== 200) {
        const {message} = isJson ? await response.json() : "Что-то пошло не так";
        throw new Error(response.status + ': ' + message);
    }

    if (isJson) return await response.json();
}

function fetchWrapper({url, options, onThen, onCatch, onFinally}) {
    fetchWrapperAsync(url, options).then(onThen).catch(onCatch).finally(onFinally);
}

export function getImages({onThen, onCatch, onFinally}) {
    const url = process.env.REACT_APP_API_URL + "/images";
    const options = {method: "GET", credentials: 'include'};

    fetchWrapper({url, options, onThen, onCatch, onFinally});
}

export function postImages({files, onThen, onCatch, onFinally}) {
    const url = process.env.REACT_APP_API_URL + "/images";
    const body = new FormData();
    for (const file of files)
        body.append('image-input', file, file.name);
    const options = {method: "POST", credentials: 'include', body};

    fetchWrapper({url, options, onThen, onCatch, onFinally});
}

export function deleteImages({selection, onThen, onCatch, onFinally}) {
    const url = process.env.REACT_APP_API_URL + "/images";
    const headers = {"Content-Type": "application/json"};

    let body;
    try {
        body = JSON.stringify([...selection]);
    } catch {
        onCatch && onCatch("Не удалось сериализовать выделенные фотографии");
        onFinally && onFinally();
        return;
    }
    const options = {method: "DELETE", credentials: 'include', headers, body};

    fetchWrapper({url, options, onThen, onCatch, onFinally});
}

export function moveImages({selection, id, onThen, onCatch, onFinally}) {
    const url = process.env.REACT_APP_API_URL + `/albums/${id}`;
    const headers = {"Content-Type": "application/json"};

    let body;
    try {
        body = JSON.stringify([...selection]);
    } catch {
        onCatch && onCatch("Не удалось сериализовать выделенные фотографии");
        onFinally && onFinally();
        return;
    }
    const options = {method: "PUT", credentials: 'include', headers, body};

    fetchWrapper({url, options, onThen, onCatch, onFinally});
}

export function getAlbums({onThen, onCatch, onFinally}) {
    const url = process.env.REACT_APP_API_URL + "/albums";
    const options = {method: "GET", credentials: 'include'};

    fetchWrapper({url, options, onThen, onCatch, onFinally});
}

export function getAlbum({id, onThen, onCatch, onFinally}) {
    const url = process.env.REACT_APP_API_URL + `/albums/${id}`;
    const options = {method: "GET", credentials: 'include'};

    fetchWrapper({url, options, onThen, onCatch, onFinally});
}

export function addAlbum({name, onThen, onCatch, onFinally}) {
    if (!name)
        throw new Error('Имя альбома не должно быть пустым');
    const url = process.env.REACT_APP_API_URL + "/albums";
    const headers = {"Content-Type": "application/json"};

    // Avoid stringify exception
    name = name.toString();
    const body = JSON.stringify({name});
    const options = {method: "POST", credentials: 'include', headers, body};

    fetchWrapper({url, options, onThen, onCatch, onFinally});
}

export function deleteAlbums({selection, onThen, onCatch, onFinally}) {
    const url = process.env.REACT_APP_API_URL + "/albums";
    const headers = {"Content-Type": "application/json"};

    let body;
    try {
        body = JSON.stringify([...selection])
    } catch {
        onCatch && onCatch("Не удалось сериализовать выделенные альбомы");
        onFinally && onFinally();
        return;
    }
    const options = {method: "DELETE", credentials: 'include', headers, body};

    fetchWrapper({url, options, onThen, onCatch, onFinally});
}

export function signUp({login, password, onThen, onCatch, onFinally}) {
    if (!login || !password) {
        onCatch && onCatch('Логин и пароль не должны быть пустыми');
        onFinally && onFinally();
        return;
    }

    const url = process.env.REACT_APP_API_URL + "/users";
    const headers = {"Content-Type": "application/json"};

    // Avoid stringify exception
    login = login.toString();
    password = password.toString();
    const body = JSON.stringify({login, password});

    // Implicit sign in => include credentials
    const options = {method: "POST", credentials: 'include', headers, body};

    fetchWrapper({url, options, onThen, onCatch, onFinally});
}

export function signIn({login, password, onThen, onCatch, onFinally}) {
    if (!login || !password) {
        onCatch && onCatch('Логин и пароль не должны быть пустыми');
        onFinally && onFinally();
        return;
    }

    const url = process.env.REACT_APP_API_URL + "/session";
    const headers = {"Content-Type": "application/json"};

    // Avoid stringify exception
    login = login.toString();
    password = password.toString();
    const body = JSON.stringify({login, password});

    const options = {method: "POST", headers, credentials: 'include', body};

    fetchWrapper({url, options, onThen, onCatch, onFinally});
}

export function signOut({onThen, onCatch, onFinally}) {
    const url = process.env.REACT_APP_API_URL + "/session";
    const options = {method: "DELETE", credentials: 'include'};

    fetchWrapper({url, options, onThen, onCatch, onFinally});
}