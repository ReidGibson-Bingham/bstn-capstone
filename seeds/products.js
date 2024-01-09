/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const fs = require('fs');
const path = require('path');

const oldBlueDataPath = path.resolve(__dirname, './../jsonData/oldBlueProducts.json');
const barnStormerDataPath = path.resolve(__dirname, './../jsonData/barnStormerProducts.json');
const bronsonMFGDataPath = path.resolve(__dirname, './../jsonData/bronsonProducts.json');
const olderbestDataPath = path.resolve(__dirname, './../jsonData/olderbestProducts.json');

const oldBlueData = fs.readFileSync(oldBlueDataPath);
const barnStormerData = fs.readFileSync(barnStormerDataPath);
const bronsonMFGData = fs.readFileSync(bronsonMFGDataPath);
const olderbestData = fs.readFileSync(olderbestDataPath);

// console.log("the data is: ", JSON.parse(data));

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('products').del()
  await knex('products').insert(JSON.parse(oldBlueData))
  await knex('products').insert(JSON.parse(barnStormerData))
  await knex('products').insert(JSON.parse(bronsonMFGData))
  await knex('products').insert(JSON.parse(olderbestData))
};
