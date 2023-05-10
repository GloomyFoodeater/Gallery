const {hash, compareSync} = require('bcrypt');
const {getConnection} = require('./../db');
const DatabaseError = require('./../errors/DatabaseError');
const {ER_DUP_ENTRY} = require("../const/mysql_codes");

async function createUser({login, password}) {
    try {
        const passwordHash = await hash(password, 5);
        await getConnection().execute(`INSERT INTO user (login, password) VALUES ("${login}", "${passwordHash}")`);
    } catch (e) {
        const message = e.errno === ER_DUP_ENTRY ? "Логин занят другим пользователем" : "Не удалось создать пользователя";
        throw new DatabaseError(message, e.code, e.sql);
    }
}

// Throw exception if not found
async function getUserById(id) {
    try {
        const [users] = await getConnection().execute(`SELECT * FROM user WHERE id=${id}`);
        return users[0];
    } catch (e) {
        throw new DatabaseError("Не удалось найти пользователя", e.code, e.sql);
    }
}

async function getUserByPair({login, password}) {
    try {
        const [users] = await getConnection().execute(`SELECT * FROM user WHERE login="${login}"`);
        const user = users[0];
        if (!user) return user;

        const correctPassword = compareSync(password, user.password.toString());
        return correctPassword ? user : undefined;
    } catch (e) {
        throw new DatabaseError("Не удалось найти пользователя", e.code, e.sql);
    }
}

module.exports = {
    createUser, getUserByPair, getUserById
}