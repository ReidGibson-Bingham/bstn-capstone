const puppeteer = require('puppeteer');
const fs = require('fs');
const axios = require('axios');
const path = require('path');

const productsPath = "./../../jsonData/bronsonProducts.JSON";
const imagesPath = "./../../images/bronson/";

const pageHeight = 600;
const pageWidth = 800;

const bronsonMFGAllURL = (pageNum) => {

    return `https://bronsonshop.com/collections/clothing?page=${pageNum}`;

}

const cart = [];

const downloadImage = async (url, destPath) => {
    const response = await axios({
        method: 'get',
        url: url,
        responseType: 'stream',
    });

    response.data.pipe(fs.createWriteStream(destPath));

    return new Promise((resolve, reject) => {
        response.data.on('end', () => resolve());
        response.data.on('error', (err) => reject(err));
    });
};

(async () => {

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    for (let i = 1; i < 10; i++) {

        await page.goto(bronsonMFGAllURL(i), { waitUntil: 'domcontentloaded' });
        await page.setViewport({ width: pageWidth, height: pageHeight });

        // Wait for the product elements to be available
        await page.waitForSelector('.section');

        // Get all product names
        const products = await page.$$eval('.product-wrap', (elements) => {
            
            return elements.map((element) => {

                const title = element.querySelector('.product-thumbnail__title').textContent.trim();
                const price = element.querySelector('.product-thumbnail__price').textContent.trim();
                const itemURL = `https://bronsonshop.com${element.querySelector('a').getAttribute('href')}`;
            
                // Get the data-srcset attribute from the source element
                const imagePath = element.querySelector('img.transition--fade-in').getAttribute('data-src');
                const modifiedUrl2 = imagePath.replace(/\?.*$/, '');
                
                return { 
                    brand: 'Bronson MFG',
                    title,
                    price,
                    itemURL,
                    imagePath: modifiedUrl2 
                };
                

            }).filter((product) => {
                return product !== null;
            });

        });

        if (products.length === 0) {

            break;

        }

        // Push the non-null products into the cart
        cart.push(products);

    }

    // download each image
    for (const product of cart.flat()) {
        
        const imageURL = product.imagePath;
        const imageFileName = path.basename(imageURL);
        const baseURL = 'http://localhost:8080/';
        const imagePath = path.join(imagesPath, imageFileName);
        const fullImageURL = baseURL + imagePath;
        // Download the image
        await downloadImage(imageURL, imagePath);
        // Store the local path in the product object
        product.imagePath = fullImageURL;

    }

    console.log("the products array: ", cart);

    try {
        fs.writeFileSync(productsPath, JSON.stringify(cart.flat(), null, 2));
        console.log('Products data has been written to products file');
    } catch (error) {
        console.error('Error writing to file:', error);
    }

})();
