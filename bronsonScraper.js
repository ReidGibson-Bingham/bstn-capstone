const pageHeight = 600;
const pageWidth = 800;

const puppeteer = require('puppeteer');

const bronsonMFGSearch = (queryValue, pageNum) => {

    return `https://bronsonshop.com/search?page=${pageNum}&q=${queryValue}`;

}

const cart = [];

(async () => {

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    for (let i = 1; i < 2; i++) {

        await page.goto(bronsonMFGSearch('peacoat', i), { waitUntil: 'domcontentloaded' });
        await page.setViewport({ width: pageWidth, height: pageHeight });

        // Wait for the product elements to be available
        await page.waitForSelector('.search__main');

        // Get all product names
        const products = await page.$$eval('.product-wrap', (elements) => {
            
            return elements.map((element) => {

                const name = element.querySelector('.product-thumbnail__title').textContent.trim();
                const price = element.querySelector('.product-thumbnail__price').textContent.trim();
            
                // Get the data-srcset attribute from the source element
                const image = JSON.stringify(element.querySelector('img.transition--fade-in').getAttribute('data-src'));

                if (image !== 'null') {
                    return { name, price, image };
                } else {
                    return null;
                }

            }).filter((product) => {
                return product !== null;
            });

        });

        if (products.length === 0) {

            break;

        }

        // for bronson the last 10 items of each search page are all just recommended items, so we should exclude them
        const productsToPush = products.slice(0, -10);

        // Push the non-null products into the cart
        cart.push(...productsToPush);

    }

    console.log("the products array: ", cart);

})();
