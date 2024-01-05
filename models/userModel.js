const knex = require('knex')(require('../knexfile'));

const authenticateUser = async (email) => {
    try {
        const user = await knex('users').select('*').where({ email }).first();
        return user;
    } catch (err) {
        throw err;
    }

}

module.exports = {
    authenticateUser
}