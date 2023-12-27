const express = require('express');
const app = express();
require("dotenv").config();
const cors = require("cors");
// const warehouses = require('./routes/warehouseRoutes');
// const inventories = require('./routes/inventoryRoutes');

// to do:
//  write scrape DATA to a JSON File
// input that JSON file as Seed data
// create scrapers for all products
// possibly clean data (remove duplicates) This might not have to be done if we scrape and post all products to the database rather than make multiple queries to scrape and post



const PORT = process.env.PORT || 5050;

// app.use(cors());
// app.use(express.json());
// app.use('/', warehouses);
// app.use('/', inventories);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});