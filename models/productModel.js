const knex = require('knex')(require('../knexfile'));

const getProducts = async () => {
    try {
      const products = await knex('products');
      return products
    } catch (err) {
      throw err;
    }
} 

module.exports = {
    getProducts,
};