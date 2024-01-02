const express = require('express');
const app = express();
require("dotenv").config();
const cors = require("cors");
const path = require('path');

// const warehouses = require('./routes/warehouseRoutes');
// const inventories = require('./routes/inventoryRoutes');
const products = require('./routes/productRoutes');

app.use('/images', express.static(path.join(__dirname, 'images')));

// to do:
//[x]  write scrape DATA to a JSON File
//[] for scraper, ensure you click on each item and take the url and description
//[] clean/format data (remove duplicates) This might not have to be done if we scrape and post all products to the database rather than make multiple queries to scrape and post
//[] input that JSON file as Seed data
//[] create scrapers for all products
//[] create api endpoints. 
//[] create user table
//[] host local static image files on my backend
//[] use the google translate api to translate some of the japanese text to english

const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());
// app.use('/', warehouses);
app.use('/', products);


app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});