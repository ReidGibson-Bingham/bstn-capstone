const pageHeight = 600;
const pageWidth = 800;

const puppeteer = require('puppeteer');

const barnStormerAllURL = (pageNum) => {

    return `https://www.barnstormer.jp/view/category/all_items?page=${pageNum}`;

}

const cart = [];

(async () => {

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    for (let i = 7; i < 9; i++) {

        await page.goto(barnStormerAllURL(i), { waitUntil: 'domcontentloaded' });
        await page.setViewport({ width: pageWidth, height: pageHeight });

        // Wait for the product elements to be available
        await page.waitForSelector('.section');

        // Get all product names
        const products = await page.$$eval('.item-list', (elements) => {
            
            return elements.map((element) => {

                const name = JSON.stringify(element.querySelector('.item-list-name').innerHTML);
                const price = element.querySelector('.item-list-price').innerHTML;
                const url = `https://www.barnstormer.jp/${element.querySelector('a').getAttribute('href')}`;
            
                // Get the data-srcset attribute from the source element
                const image = JSON.stringify(element.querySelector('img').getAttribute('src'));

                if (image !== 'null') {
                    return { name, price, image, category: "clothes", url};
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

    for (const product of cart.flat()) {
        await page.goto(product.url, { waitUntil: 'domcontentloaded' });

        // Use page.$eval to get the sizing text
        try {
            const sizingText = await page.$eval('.item-description', (element) => {
                return element.textContent.trim();
            });
            product.sizing = sizingText;
        } catch (error) {
            console.error('Error getting sizing text:', error.message);
        }
    }

    console.log("the products array: ", cart);

})();
