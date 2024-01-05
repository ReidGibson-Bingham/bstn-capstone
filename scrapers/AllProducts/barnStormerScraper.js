const puppeteer = require('puppeteer');
const fs = require('fs');
const axios = require('axios');
const path = require('path');

const productsPath = "./../../jsonData/barnStormerProducts.JSON";
const imagesPath = "./../../images/barnStormer/";
const pageHeight = 600;
const pageWidth = 800;

const barnStormerAllURL = (pageNum) => {
    return `https://www.barnstormer.jp/view/category/all_items?page=${pageNum}`;
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

    for (let i = 10; i < 15; i++) {

        await page.goto(barnStormerAllURL(i), { waitUntil: 'domcontentloaded' });
        await page.setViewport({ width: pageWidth, height: pageHeight });

        // Wait for the product elements to be available
        await page.waitForSelector('.section');

        // Get all product names
        const products = await page.$$eval('.item-list', (elements) => {
            
            return elements.map((element) => {

                const title = JSON.stringify(element.querySelector('.item-list-name').innerHTML);
                const price = element.querySelector('.item-list-price').innerHTML;
                const itemURL = `https://www.barnstormer.jp/${element.querySelector('a').getAttribute('href')}`;
            
                // Get the data-srcset attribute from the source element
                const imageURL = element.querySelector('img').getAttribute('src');

                return { title, price, itemURL, imagePath: imageURL };
                

            }).filter((product) => {
                return product !== null;
            });

        });

        if (products.length === 0) {

            break;

        }

        // Push the non-null products into the cart
        cart.push(...products);

    }

    for (const product of cart.flat()) {
        await page.goto(product.itemURL, { waitUntil: 'domcontentloaded' });

        const imageFileName = path.basename(product.imagePath);
        const baseURL = 'http://localhost:8080/';
        const imagePath = path.join(imagesPath, imageFileName);
        const fullImageURL = baseURL + imagePath;

        await downloadImage(product.imagePath, imagePath);

        // Use page.$eval to get the sizing text
        try {
            const brand = await page.$eval('.category-name', (element) => {
                return element.textContent.trim();
            });
            product.brand = brand;
            product.imagePath = fullImageURL;
        } catch (error) {
            console.error('Error getting sizing text:', error.message);
        }
    }

    console.log("the products array: ", cart);

    try {
        fs.appendFileSync(productsPath, JSON.stringify(cart.flat(), null, 2));
        console.log('Products data has been written to products file');
    } catch (error) {
        console.error('Error writing to file:', error);
    }

})();
