const productModel = require('./../models/productModel');

const getProducts = async (_req, res) => {
    try {
        const products = await productModel.getProducts();
        if (products) {
            res.status(200).json(products);
        } else {
            res.status(404).send(`products not found`);
        }
    } catch (err) {
        res.status(500).send(`Error retrieving products: ${err}`);
    }
}

module.exports = {
    getProducts,
};