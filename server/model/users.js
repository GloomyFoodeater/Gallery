const {hash, compareSync} = require('bcrypt');
const {getConnection} = require('./../db');

async function createUser({login, password}) {
    const passwordHash = await hash(password, 5);
    await getConnection().execute(`INSERT INTO user (login, password) VALUES ("${login}", "${passwordHash}")`);
}

async function getUserById(id) {
    let user;
    try {
        const [users] = await getConnection().execute(`SELECT * FROM user WHERE id=${id}`);
        user = users[0];
    } catch {
        user = undefined;
    }
    return user;
}

async function getUserByPair({login, password}) {
    const [users] = await getConnection().execute(`SELECT * FROM user WHERE login="${login}"`);
    const user = users[0];
    const correctPassword = compareSync(password, user.password.toString());
    return correctPassword ? user : undefined;
}

module.exports = {
    createUser, getUserByPair, getUserById
}