const express = require('express');
const router = express.Router();

router
    .route('/api/products')
    .get((_req, res) => {
        res.send("testing this route.");
    })