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

const getProduct = async (req, res) => {
    const id = req.params.productId;
    try {
        const product = await productModel.getProductById(id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).send('product not found');
        }
    } catch (err) {
        res.status(500).send(`Error retrieveing product: ${err}`);
    }
}

module.exports = {
    getProducts,
    getProduct
};