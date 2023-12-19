# Project Title

## HapiCapi

### Overview

HapiCapi is a web application that leverages web crawling with Node Cheerio and some simple sorting algorithms to discover and present the best deals on various products available in Japan. The app provides users with a streamlined and efficient way to find cost-effective items, fostering happiness through smart capitalism, all while embodying the spirit of the capybara.

### Problem

Many consumers in North America don't have time to search for deals on Japanese websites. Not all websites can be translated with ease, and a lot of the mom-and-pop websites don't cater to foreign audiences. This app aims to address this issue by aggregating product information, comparing prices, and presenting users with the most affordable options for items that can only (or mostly) be bought in Japan.

### User Profile

The target users for HapiCapi are online shoppers in North America who are looking to find the best deals on a wide range of products. Users will interact with the app through a computer terminal-like interface, providing a simple and efficient user experience. Small, simple images of the products will show in the search list. When a user clicks on the item, it will expand with a larger, clearer image of the product along with a link to the website where they can purchase the item.

### Features

1. **Product Search:**
   - Users can search for specific products or browse categories.
   - Filter options based on price range, brand, and other relevant criteria.

2. **Deal Sorting:**
   - Sorting algorithm to arrange products based on price, discounts, or a combination of factors.
   - Highlighting special promotions or limited-time offers.

3. **Web Crawling:**
   - Implement web crawling with Node Cheerio to fetch and update product information from various online retailers.

4. **User Preferences:**
   - Allow users to set preferences for preferred brands, price ranges, or specific categories.
   - Personalized recommendations based on user preferences.

5. **Terminal Interface:**
   - Design a user interface reminiscent of a computer terminal for a unique and nostalgic user experience.

## Implementation

### Tech Stack

- Frontend: React (HTML, CSS, JavaScript)
- Backend: Node.js, Express
- Database: Firebase (MongoDB for additional storage)
- Web Crawling: Node Cheerio
- Sorting Algorithm: Merge Sort or Quick Sort
- Authentication: Firebase Authentication

### APIs

- Implement APIs to fetch product details from popular e-commerce platforms in Japan.

### Sitemap

1. signup
2. home / Search Results
3. Product Details (Modal. so same page as home)

### Mockups

![Terminal Interface] https://i.imgur.com/Q0TYbbg.png

### Data

- Product: ID, Name, Description, Price, Discount, Brand, Category
- User: ID, Preferences

### Endpoints

1. `/api/products` (GET): Fetch list of products based on user preferences.
2. `/api/products/:id` (GET): Get details of a specific product.
3. `/api/users/:id/preferences` (GET/PUT): Get or update user preferences.

### Auth

Implement user authentication using Firebase Authentication.

## Roadmap

**Week 1: Planning and Setup**
- Define project scope and requirements.
- Set up project structure and version control.

**Week 2: Frontend Development**
- Create terminal-like interface.
- Implement product search and display.

**Week 3: Backend Development**
- Set up server and database.
- Implement endpoints for product retrieval.

**Week 4: Web Crawling and Sorting**
- Develop web crawling functionality with Node Cheerio.
- Implement sorting algorithm for deal sorting.

**Week 5: User Preferences and Personalization**
- Allow users to set preferences.
- Integrate personalized recommendations.

**Week 6: Testing and Optimization**
- Conduct thorough testing.
- Optimize performance and fix any bugs.

**Week 7: Deployment**
- Deploy the app to a hosting service.
- Conduct final checks and ensure everything is working smoothly.

## Nice-to-haves

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