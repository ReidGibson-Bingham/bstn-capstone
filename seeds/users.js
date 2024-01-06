/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('users').del()
    // Inserts seed entries
    await knex('users').insert([
        {
            username: 'Brainstation Is-Cool',
            email: 'BrainstationIsCool@gmail.com',
            password: 'brainstationiscool',
            favourites: JSON.stringify([1, 3, 5]),
            history: JSON.stringify(['red shirt']),
        },
    ]);
};