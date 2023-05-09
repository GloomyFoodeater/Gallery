export function doesHttpOnlyCookieExist(name) {
    const d = new Date();
    d.setTime(d.getTime() + (1000));
    const expires = "expires=" + d.toUTCString();

    document.cookie = name + "=new_value;path=/;" + expires;
    return document.cookie.indexOf(name + '=') === -1;
}