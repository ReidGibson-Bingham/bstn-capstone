/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const fs = require('fs');
const dataPath = './../jsonData/oldBlueProducts';

const parseData = () => {
    const data = fs.readFileSync(dataPath);
    return json.parse(data);
}

exports.seed = async function (knex) {
    // Deletes ALL existing entries
    await knex('products').del();
    // insert an array of objects
    await knex('products').insert(parseData(dataPath));
    };