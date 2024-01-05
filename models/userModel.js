const knex = require('knex')(require('../knexfile'));

const authenticateUser = async (email) => {
    try {
        const user = await knex('users').select('*').where({ email }).first();
        return user;
    } catch (err) {
        throw err;
    }

}

const getFavourites = async () => {
    
    try {
        const favourites = ((await knex('users').pluck('favourites')).flat());
        return favourites;
    } catch (err) {
        throw err;
    }
}

const saveFavourite = async (favouriteId) => {
    try {
        // Fetch the first user
        const user = await knex('users').first();

        if (user) {
            // Assuming 'favourites' is an array column in the 'users' table
            await knex('users')
                .where('id', user.id)
                .update({
                    favourites: knex.raw('JSON_ARRAY_APPEND(??, "$", ?)', ['favourites', favouriteId])
                });
        } else {
            throw new Error('No users found');
        }
    } catch (err) {
        throw err;
    }
};

const deleteFavourite = async (favouriteId) => {
    try {
        const user = await knex('users').first();

        if (user) {
            const updatedFavourites = user.favourites.filter(id => id !== favouriteId);

            // Update the user's favorites column
            await knex('users')
                .where('id', user.id)
                .update({
                    favourites: knex.raw('JSON_SET(??, "$", ?)', ['favourites', knex.raw('JSON_ARRAY(?)', [updatedFavourites])])
                });

        } else {
            throw new Error('No users found');
        }
    } catch (err) {
        throw err;
    }
}

module.exports = {
    authenticateUser, 
    getFavourites, 
    saveFavourite, 
    deleteFavourite
}