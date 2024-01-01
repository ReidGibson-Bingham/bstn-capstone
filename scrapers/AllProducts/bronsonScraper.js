const pageHeight = 600;
const pageWidth = 800;

const puppeteer = require('puppeteer');

const bronsonMFGAllURL = (pageNum) => {

    return `https://bronsonshop.com/collections/clothing?page=${pageNum}`;

}

const cart = [];

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

                const name = element.querySelector('.product-thumbnail__title').textContent.trim();
                const price = element.querySelector('.product-thumbnail__price').textContent.trim();
                const url = `https://bronsonshop.com/${element.querySelector('a').getAttribute('href')}`;
            
                // Get the data-srcset attribute from the source element
                const image = JSON.stringify(element.querySelector('img.transition--fade-in').getAttribute('data-src'));
                const description = `brand new ${name}`

                if (image !== 'null') {
                    return { name, price, image, description, category: "clothes", url };
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
        cart.push(products);

    }

    console.log("the products array: ", cart);
    console.log(`

     /$$   /$$                     /$$  /$$$$$$                      /$$
    | $$  | $$                    |__/ /$$__  $$                    |__/
    | $$  | $$  /$$$$$$   /$$$$$$  /$$| $$  \__/  /$$$$$$   /$$$$$$  /$$
    | $$$$$$$$ |____  $$ /$$__  $$| $$| $$       |____  $$ /$$__  $$| $$
    | $$__  $$  /$$$$$$$| $$  \ $$| $$| $$        /$$$$$$$| $$  \ $$| $$
    | $$  | $$ /$$__  $$| $$  | $$| $$| $$    $$ /$$__  $$| $$  | $$| $$
    | $$  | $$|  $$$$$$$| $$$$$$$/| $$|  $$$$$$/|  $$$$$$$| $$$$$$$/| $$
    |__/  |__/ \_______/| $$____/ |__/ \______/  \_______/| $$____/ |__/
                        | $$                              | $$          
                        | $$                              | $$          
                        |__/                              |__/         
    `)

})();
