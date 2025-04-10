# Inventory Management System API

This is a CRUD application built with Express.js and MySQL for managing inventory with three main entities:
- Products
- Categories
- Suppliers

## Project Structure

```
ADRIAN--EXPRESS/
├── src/
│   ├── config/       # Database configuration
│   ├── controllers/  # Request handlers
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   └── index.js      # Main application file
├── .env              # Environment variables
├── .gitignore        # Git ignore file
├── docker-compose.yml # Docker Compose configuration
├── Dockerfile        # Docker configuration
├── init.sql          # Database initialization script
├── package.json      # Project dependencies
└── README.md         # Project documentation
```

## Prerequisites

- Docker
- Docker Compose

## Running the Application

1. Clone the repository
2. Navigate to the project directory
3. Run the following command:

```bash
docker-compose up
```

This will:
- Build the Node.js application container
- Start the MySQL database container
- Initialize the database with sample data
- Connect the application to the database

The API will be available at http://localhost:3000

## API Endpoints

### Products
- GET /api/products - Get all products
- GET /api/products/:id - Get a specific product
- POST /api/products - Create a new product
- PUT /api/products/:id - Update a product
- DELETE /api/products/:id - Delete a product

### Categories
- GET /api/categories - Get all categories
- GET /api/categories/:id - Get a specific category
- POST /api/categories - Create a new category
- PUT /api/categories/:id - Update a category
- DELETE /api/categories/:id - Delete a category
- GET /api/categories/:id/products - Get all products in a category

### Suppliers
- GET /api/suppliers - Get all suppliers
- GET /api/suppliers/:id - Get a specific supplier
- POST /api/suppliers - Create a new supplier
- PUT /api/suppliers/:id - Update a supplier
- DELETE /api/suppliers/:id - Delete a supplier
- GET /api/suppliers/:id/products - Get all products from a supplier

## Development

To make changes to the application:
1. Modify the code as needed
2. The application will automatically reload (if using nodemon)
3. If you need to rebuild the Docker containers, run:
```bash
docker-compose down
docker-compose up --build
```
