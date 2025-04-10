const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplier.controller');

// Create a new Supplier
router.post('/', supplierController.create);

// Retrieve all Suppliers
router.get('/', supplierController.findAll);

// Retrieve a single Supplier with id
router.get('/:id', supplierController.findOne);

// Update a Supplier with id
router.put('/:id', supplierController.update);

// Delete a Supplier with id
router.delete('/:id', supplierController.delete);

// Retrieve all Products for a Supplier
router.get('/:id/products', supplierController.findProducts);

module.exports = router;
