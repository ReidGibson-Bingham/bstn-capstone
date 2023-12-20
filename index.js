// the default view size for puppeteer is: 800x600 pixels

const defaultHeight = 600;
const defaultWidth = 800;

// const puppeteer = require('puppeteer');

// const productPageUrl = 'https://misterfreedom.com/collections/all';

// (async () => {
//     const browser = await puppeteer.launch({ headless: 'new' }); // Use { headless: false } to launch a visible browser for debugging
//     const page = await browser.newPage();

//     const searchInput = await page.$('.Search__Input');
    
//     if (!searchInput) {
//             console.error('Search bar not found');
//     } else {
//             await searchInput.type('JACKET');
//     }

//     // Navigate to the website
//     await page.goto(productPageUrl);

//     // Store the initial URL
//     const initialUrl = page.url();
//     console.log("the initial url: ", initialUrl);

//     // Find the search bar element and type a query
//     await page.type('input[name="q"]', 'JACKET');

//     // Submit the form
//     await page.keyboard.press('Enter');

//     const newUrl = page.url();
//     console.log("the newURl: ", newUrl)

//     // if (newUrl !== initialUrl) {
//     //     console.log('URL has changed:', newUrl);
//     // } else {
//     //     console.log('URL has not changed');
//     // }

//     // Wait for navigation to complete
    // await page.waitForNavigation();
//     // console.log("page successfully navigated");

    

//     // Wait for the results or a specific element to appear on the page
//     // const searchResultsIndicatorSelector = '.SectionHeader__Description'; // Update this selector to match a unique element on the search results page
//     // await page.waitForSelector(searchResultsIndicatorSelector, { timeout: 1000 });

//     // Extract and log innerHTML of the test variable
//     // const innerHTML = await page.evaluate(el => el.innerHTML, test);
//     // console.log("innerHTML of test:", innerHTML);

//     // Extract product titles
//     // const products = await page.evaluate(() => {
//     //     const productList = document.querySelectorAll('.ProductItem__Title');
//     //     return Array.from(productList, product => product.textContent.trim());
//     // });

//     // console.log("The products are:", products);

//     // Other actions with the search results if needed

//     // Close the browser
//     await browser.close();

// })();


// const puppeteer = require('puppeteer');

// const url = 'https://misterfreedom.com/';

// const productPageUrl = 'https://misterfreedom.com/collections/all';

// (async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
  
//     try {
//       await page.goto(productPageUrl, { waitUntil: 'domcontentloaded' });
  
//       // Example: Extract product name
//       const productName = await page.$eval('.ProductItem__Title', (element) => element.textContent.trim());
//       console.log('Product Name:', productName);
  
//       // Example: Extract product price
//       const productPrice = await page.$eval('.ProductItem__Price', (element) => element.textContent.trim());
//       console.log('Product Price:', productPrice);
  
//       // Add more code to extract other product information...
  
//     } catch (error) {
//       console.error('Error:', error);
//     } finally {
//       await browser.close();
//     }
//   })();

// testing to see if i can target the button
const puppeteer = require('puppeteer');

(async () => {

    const browser = await puppeteer.launch({ headless: 'new' });;
    const page = await browser.newPage();
  
    await page.goto('https://misterfreedom.com/collections/all'); // Replace with the URL of the page you are working with

    await page.setViewport({ width: defaultWidth, height: defaultHeight });

    const initialUrl = page.url();

    console.log("the initial url: ", initialUrl);

    const searchLink = await page.waitForSelector('.Header__Icon');

  // Click the <a> tag
    await searchLink.click();

  //     // Find the search bar element and type a query
    await page.type('input[aria-label="Search..."]', 'JACKET');

// //     // Submit the form
    await page.keyboard.press("Enter");

    const newUrl = page.url();

    setTimeout(() => {
        console.log("the newURl: ", newUrl)
    }, 10000);
    

    // prestige--v4 features--heading-small features--heading-uppercase features--show-price-on-hover  template-search
    // possible selector after a new search query

    // const products = await page.evaluate(() => {
    //     const productList = document.querySelectorAll('.ProductItem__Title');
    //     return Array.from(productList, product => product.textContent.trim());
    // });

    // console.log("products: ", products)

    // const productName = await page.$eval('.ProductItem__Title', (element) => element.textContent.trim());
    
    // console.log('Product Name:', productName);

    // await page.waitForNavigation();

    await browser.close();
})();