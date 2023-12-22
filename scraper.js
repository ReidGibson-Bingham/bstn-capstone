const pageHeight = 600;
const pageWidth = 800;

const puppeteer = require('puppeteer');

const misterFreedomSearch = (queryValue) => {
    return `https://misterfreedom.com/search?q=${queryValue}}&type=product&options%5Bprefix%5D=last`;
}

const cart = [];

(async () => {

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    // await page.goto(misterFreedomSearch('shirt'));
    await page.goto(misterFreedomSearch('shirt'), { waitUntil: 'domcontentloaded' });
    await page.setViewport({ width: pageWidth, height: pageHeight });

    // Wait for the product elements to be available
    await page.waitForSelector('.ProductList');

    // Get all product names
    const products = await page.$$eval('.ProductItem', (elements) => {
        return elements.map((element) => {
            const name = element.querySelector('.ProductItem__Title').textContent.trim();
            const price = element.querySelector('.ProductItem__Price').textContent.trim();
            const image = JSON.stringify(element.querySelector('.ProductItem__Image').getAttribute('data-srcset'));
            return { name, price, image };
        });
    });

    cart.push(products);

    console.log('Products:', cart);

    // Keep the browser open for a longer time (e.g., 10 seconds)
    await page.waitForTimeout(10000);

    // Close the browser
    await browser.close();

})();
