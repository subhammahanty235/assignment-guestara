Guestara Menu Management Backend
Features

** Deployed URL : https://guestara-assignment.azurewebsites.net/

Menu management with hierarchical structure:
    Categories
    Subcategories under categories
    Items under subcategories

Tax management at each level
Search functionality for items
Full CRUD operations for all entities


Installation
1. Clone the repository (git clone [repo-url])
2. Install dependencies (npm install)
3. Copy .env.dev to .env
4. Start the server (npm run dev)

API Endpoints
    Categories

        POST /api/categories - Create a new category
        GET /api/categories - Get all categories
        GET /api/categories/:id - Get category by ID
        PUT /api/categories/:id - Update category

    Subcategories

        POST /api/subcategories - Create a new subcategory
        GET /api/subcategories - Get all subcategories
        GET /api/subcategories/:id - Get subcategory by ID
        PUT /api/subcategories/:id - Update subcategory
    
    Items

        POST /api/items - Create a new item
        GET /api/items - Get all items
        GET /api/items/search - Search items by name
        PUT /api/items/:id - Update item



Example JSONs for API body
1. Create a new category

{
  "name": "Clothing",
  "image": "https://example.com/images/mens-clothing.png",
  "description": "A collection of clothing including men/women shirts, trousers, and more.",
  "taxApplicable": true,
  "tax": 18
}

2. Create a new SubCategory

{
  "categoryId": "Category Id of a category",
  "name": "Men's Clothing",
  "image": "https://example.com/images/mens-clothing.png",
  "description": "A collection of men's clothing including shirts, trousers, and more.",
  "taxApplicable": true,
  "tax": 18
}

3. Create a new Item

{
  "subCategoryId": "SubCategory Id of a subcategory",
  "name": "Shirts",
  "image": "https://example.com/images/shirts.png",
  "description": "A collection of men's shirts",
  "taxApplicable": true,
  "tax": 18,
  "baseAmount":1000,
  "discount":100
}

Database Choice
    MySQL was chosen for this project because:

        Strong ACID compliance for reliable transactions (not used in this project)
        Built-in support for relationships (perfect for category hierarchy)
        Wide community support and extensive documentation
        Easy integration with Node.js through Sequelize ORM 

Learning Points

    Multiple model based operations like beforeSave..
    Managing relationships with Sequelize ORM

What was the most difficult part of the assignment?

    I felt the assignment was not that much difficult and every instruction was mentioned clearly. 
    But i thought to deploy the assignment to azure using docker and Github Actins, that was a bit hard to be honest but i managed to do it. 

Future Improvements

    Adding authentication and authorization
    Implementing caching for frequently accessed data
    A transactionId based approval system to stop data getting live before approval.
    Basic frontend for all those operations
    Image upload functionality instead of URLs
    Adding unit and integration tests







    



