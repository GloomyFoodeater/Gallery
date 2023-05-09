const {getConnection} = require('./../db');

async function createUser() {
    // TODO: Implement
    return new Promise((resolve, reject) => {
        console.log('Create user')
        resolve();
    });
}

async function getUser({login, password}) {
    // TODO: Implement
    console.log('Get user');
    return Promise.resolve(true);
}

module.exports = {
    createUser, getUser
}