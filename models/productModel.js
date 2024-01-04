const knex = require('knex')(require('../knexfile'));

const getProducts = async () => {
    try {
      const products = await knex('products');
      return products
    } catch (err) {
      throw err;
    }
} 

const getProductById = async (id) => {
  try {
    const product = await knex('products').where({ id }).first();
    return product;
  } catch (err) {
    throw err;
  }
}

module.exports = {
    getProducts,
    getProductById,
};