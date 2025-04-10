const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

// Create a new Category
router.post('/', categoryController.create);

// Retrieve all Categories
router.get('/', categoryController.findAll);

// Retrieve a single Category with id
router.get('/:id', categoryController.findOne);

// Update a Category with id
router.put('/:id', categoryController.update);

// Delete a Category with id
router.delete('/:id', categoryController.delete);

// Retrieve all Products for a Category
router.get('/:id/products', categoryController.findProducts);

module.exports = router;
