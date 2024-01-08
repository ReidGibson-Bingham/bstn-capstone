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

const updateProductSizing = async (id, updatedData) => {
  try {
    const product = await knex('products').where({ id }).first();

    if (product) {
      await knex('products')
        .where('id', id)
        .update({
          sizing: knex.raw('JSON_ARRAY_APPEND(??, "$", ?)', ['sizing', updatedData.sizing])
        })
    } else {
      throw new Error('No product found for given product id.');
  }

  } catch (err) {
    throw err;
  }
}

const updateProductDescription = async (id, descriptionInput) => {
  try {
    const product = await knex('products').where({ id }).first();

    if (product) {
      await knex('products')
        .where('id', id)
        .update({
          description: knex.raw('JSON_ARRAY_APPEND(??, "$", ?)', ['description', descriptionInput])
        })
    } else {
      throw new Error('No product found for given product id.');
  }

  } catch (err) {
    throw err;
  }
}

module.exports = {
    getProducts,
    getProductById,
};