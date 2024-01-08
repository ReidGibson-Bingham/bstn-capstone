const puppeteer = require('puppeteer');
const fs = require('fs');
const axios = require('axios');
const path = require('path');

const productsPath = "./../../jsonData/oldBlueproducts.JSON";
const imagesPath = "./../../images/oldBlue/";
const pageHeight = 600;
const pageWidth = 800;

const oldBlueAllURL = (pageNum) => {
    return `https://oldblueco.net/dry-goods/page/${pageNum}/`;
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

    for (let i = 1; i < 14; i++) {

        await page.goto(oldBlueAllURL(i), { waitUntil: 'domcontentloaded' });
        await page.setViewport({ width: pageWidth, height: pageHeight });

        // Wait for the product elements to be available
        await page.waitForSelector('.products');


        // Get all product names
        const products = await page.$$eval('.product-inner', (elements) => {
            
            return elements.map( (element) => {

                const title = element.querySelector('.cd').textContent.trim();
                const price = element.querySelector('.price').textContent.trim();
                const itemURL = element.querySelector('a').getAttribute('href')

                
                return {
                    brand: 'Old Blue Co',
                    title,
                    price,
                    itemURL
                };

            }).filter((product) => product !== null);;

        });

        if (products.length === 0) {

            break;

        }

        cart.push(products);

    }

    for (const product of cart.flat()) {
        await page.goto(product.itemURL, { waitUntil: 'domcontentloaded' });

        const imageURL = await page.$eval('img.attachment-shop_single', img => img.getAttribute('src'));
    
        const imageFileName = path.basename(imageURL);
        const baseURL = 'http://localhost:8080/';
        const imagePath = path.join(imagesPath, imageFileName);
        const fullImageURL = baseURL + imagePath;

        // Download the image
        await downloadImage(imageURL, imagePath);

        // Store the local path in the product object
        product.imagePath = fullImageURL;
    }
    
    console.log('Products:', cart);

    try {
        fs.writeFileSync(productsPath, JSON.stringify(cart.flat(), null, 2));
        console.log('Products data has been written to products file');
    } catch (error) {
        console.error('Error writing to file:', error);
    }

})();

