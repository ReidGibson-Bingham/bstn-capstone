const pageHeight = 600;
const pageWidth = 800;

const puppeteer = require('puppeteer');

const misterFreedomSearch = (queryValue, pageNum) => {
    return `https://misterfreedom.com/search?options%5Bprefix%5D=last&page=${pageNum}&q=${queryValue}&type=product`;
}

const cart = [];

(async () => {

    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    for (let i = 1; i < 50; i++) {

        await page.goto(misterFreedomSearch('mister freedom', i), { waitUntil: 'domcontentloaded' });
        await page.setViewport({ width: pageWidth, height: pageHeight });

        // Wait for the product elements to be available
        await page.waitForSelector('.ProductList');


        // Get all product names
        const products = await page.$$eval('.ProductItem', (elements) => {
            
            return elements.map((element) => {

                const name = element.querySelector('.ProductItem__Title').textContent.trim();
                const price = element.querySelector('.ProductItem__Price').textContent.trim();
            
                // Get the data-srcset attribute from the source element
                const image = JSON.stringify(element.querySelector('img.ProductItem__Image').getAttribute('srcset'));

                if (image !== 'null') {
                    return { name, price, image };
                } else {
                    return null;
                }

            }).filter((product) => product !== null);;

        });

        if (products.length === 0) {

            break;

        }

        cart.push(products);

    }
    
    console.log('Products:', cart);

})();
