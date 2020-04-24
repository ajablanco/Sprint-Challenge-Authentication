const db = require('../database/dbConfig')

module.exports = {
    add,
    findBy
}

function add(user) {
    return db('users').insert(user).then(res => {
        return {id: res[0]}
    });
}

function findBy(id) {
    return db('users').where(id).first();
}