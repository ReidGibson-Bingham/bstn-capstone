# Project Title

## HapiCapi

### Overview

HapiCapi is a web application that leverages web crawling with Node Cheerio and some simple sorting algorithms to discover and present the best deals on various products available in Japan. The app provides users with a streamlined and efficient way to find cost-effective items, fostering happiness through smart capitalism, all while embodying the spirit of the capybara.

### Problem

Many consumers in North America don't have time to search for deals on Japanese websites. Not all websites can be translated with ease, and a lot of the mom-and-pop websites don't cater to foreign audiences. This app aims to address this issue by aggregating product information, comparing prices, and presenting users with the most affordable options for items that can only (or mostly) be bought in Japan. I will also use some north american retailers that carry relevent products(their prices are higher so maybe that will illustrate the advantages of online shopping in japan.)

### User Profile

The target users for HapiCapi are online shoppers in North America who are looking to find the best deals on a wide range of products. Users will interact with the app through a computer terminal-like interface, providing a simple and efficient user experience. Small, simple images of the products will show in the search list. When a user clicks on the item, it will expand with a larger, clearer image of the product along with a link to the website where they can purchase the item.

### Features

1. **Product Search:**
   - Users can search for specific products or browse categories.
   - users will use the frontend search bar, which will be connected to the search results from the puppeteer headless browser. I'll output the puppeteer logs using a terminal api to provide more visual iinterest in the frontend. a list of items will appear while this is happening
   - I'm gonna include some very simple translation stuff. for instance if a user types in "jacket". I can force the search term " ジャケット " for any japanese sites i'm using puppeteer with for more accurate  search results. 
   - Filter options based on price range and category. Possibly brand

2. **Deal Sorting:**
   - Sorting algorithm to arrange products based on price, discounts, or a combination of factors.
   - Highlighting special promotions or limited-time offers.

3. **save favourite items:**
   - save an item in history
   - save search querys

4. **Web Crawling:**
   - Implement web crawling with Google's Puppeteer . right now i'm trying to use Puppeteer for headless browsing. I can use a site's search function to display whatever data they show. 
   I might try Node Cheerio in the future. 
   - If my IP address get's blocked that will be a huge problem. I will use fake data in that case. 

5. **Terminal Interface:**
   - Design a user interface reminiscent of a computer terminal for a unique and nostalgic user experience.
   - i want to incorporate xterm.js to actually show my terminal in the browser when using the web crawler or writing to the database or when any backend operation is occuring

## Implementation

### Tech Stack

- Frontend: React (HTML, CSS, JavaScript) and xterm.js for the terminal api
- Backend: Node.js, Express
- Database: Firebase or MySQL (Mysql workbench)
- Web Crawling: mostly google chrome's puppeteer (possiblyNode Cheerio)
- Sorting Algorithm: Merge Sort or Quick Sort


### APIs

- xterm.js, google puppeteer, possibly the Ebay api for deals!

### Sitemap

1. signup
2. home / Search Results / terminal output
3. Product Details (Modal. so same page as home)
4. user search history
5. possibly some graphs

### Mockups

![https://i.imgur.com/Q0TYbbg.png] https://i.imgur.com/Q0TYbbg.png

### Data

- Product: ID, Name, Description, Price, Brand, Category, link to website
- User: ID, Name, Email, password, search results

### Endpoints

1. `/api/products` (GET): Fetch list of products based on user 
preferences.
2. `/api/products/:id` (GET): Get details of a specific product.
3. `/api/user/:historyId` (POST): post a user's search history.
4. possibly `/api/products` (POST): I'd like to mostly do real time using puppeteer, but i might have to post some data too. 

### Auth

(Stretch goal) Implement user authentication using Firebase Authentication.

## Roadmap

**Week 1**
- Define project scope and requirements.
- Set up project structure and version control.
- Develop web crawling functionality with puppeteer.
- Implement product search and display, which is connected to puppeteer
**week 2**
- Create terminal-like interface using xterm
- Set up server, database and all api calls
- Implement sorting algorithm for deal sorting.
**Week 3**
- Conduct thorough testing.
- Optimize performance and fix any bugs.
- (extra stretch)Deploy the app to a hosting service.
- Conduct final checks and ensure everything is working smoothly.

## Nice-to-haves

0. **authentication**
   - Authentication: Firebase Authentication or JWT authentication

1. **Payment Processor**
    - Allow users to pay for products on the site rather than having to visit the Japanese store.

2. **Import Duties API**
    - Show users how much they might have to pay for import duties. Many sites don't notify foreign users of this.

3. **Price History Graphs:**
   - Display historical price trends for products.

4. **Social Sharing:**
   - Allow users to share great deals on social media.

5. **Multi-language Support:**
   - Implement support for multiple languages.

6. **Price Drop Alerts:**
   - Enable users to set alerts for price drops on specific products.

7. - Integrate personalized recommendations.


### for running this
env variables are:
PORT=8080
DB_HOST=127.0.0.1
DB_NAME=hapidb
DB_USER=root
DB_PASSWORD=rootroot

<!--  -->