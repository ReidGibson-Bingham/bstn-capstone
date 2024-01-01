/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const path = require('path');
const dataPath = path.resolve(__dirname, './../jsonData/oldBlueProducts.json');

const fs = require('fs');

const data = fs.readFileSync(dataPath)

// console.log("the data is: ", JSON.parse(data));

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('products').del()
  await knex('products').insert(JSON.parse(data));
};
