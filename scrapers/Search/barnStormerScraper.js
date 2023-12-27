const pageHeight = 600;
const pageWidth = 800;

const puppeteer = require('puppeteer');

const barnStormerSearch = (queryValue, pageNum) => {

    return `https://www.barnstormer.jp/view/search?page=${pageNum}&search_keyword=${queryValue}`;

}

const cart = [];

(async () => {

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    for (let i = 1; i < 10; i++) {

        await page.goto(barnStormerSearch('corduroy', i), { waitUntil: 'domcontentloaded' });
        await page.setViewport({ width: pageWidth, height: pageHeight });

        // Wait for the product elements to be available
        await page.waitForSelector('.section');

        // Get all product names
        const products = await page.$$eval('.item-list', (elements) => {
            
            return elements.map((element) => {

                const name = JSON.stringify(element.querySelector('.item-list-name').innerHTML).slice(37, -5);
                const price = element.querySelector('.item-list-price').innerHTML;
            
                // Get the data-srcset attribute from the source element
                const image = JSON.stringify(element.querySelector('img').getAttribute('src'));

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

        // Push the non-null products into the cart
        cart.push(...products);

    }

    console.log("the products array: ", cart);

})();
