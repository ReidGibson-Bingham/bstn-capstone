const express = require('express');
const router = express.Router();
const dataPath = './../jsonData';
import data from './../jsonData/oldBlueProducts.json';

router
    .route('/api/products')
    .get((_req, res) => {
        try {
            
        } catch (error) {
            console.log("error reading from file: ", error);
            res.status(500).send('error reading from the products get route', error);
        }
    })