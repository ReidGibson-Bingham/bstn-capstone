const puppeteer = require('puppeteer');
const fs = require('fs');

const pageHeight = 600;
const pageWidth = 800;
const productsPath = "./../../jsonData/oldBlueproducts.JSON";

const oldBlueAllURL = (pageNum) => {
    return `https://oldblueco.net/dry-goods/page/${pageNum}/`;
}

const cart = [];

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
    
        product.imageURL = imageURL;
    }
    
    console.log('Products:', cart);

    try {
        fs.writeFileSync(productsPath, JSON.stringify(cart.flat(), null, 2));
        console.log('Products data has been written to products.js');
    } catch (error) {
        console.error('Error writing to file:', error);
    }

})();

