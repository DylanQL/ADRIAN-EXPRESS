const Product = require('../models/product.model');

// Create and Save a new Product
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      message: "Name and price are required fields"
    });
  }

  try {
    // Create a Product
    const product = {
      name: req.body.name,
      description: req.body.description || "",
      price: req.body.price,
      stock: req.body.stock || 0,
      category_id: req.body.category_id,
      supplier_id: req.body.supplier_id
    };

    // Save Product in the database
    const data = await Product.create(product);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating the Product."
    });
  }
};

// Retrieve all Products from the database
exports.findAll = async (req, res) => {
  try {
    const data = await Product.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving products."
    });
  }
};

// Find a single Product with an id
exports.findOne = async (req, res) => {
  try {
    const data = await Product.getById(req.params.id);
    if (!data) {
      return res.status(404).json({
        message: `Product with id ${req.params.id} not found`
      });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: `Error retrieving Product with id ${req.params.id}`
    });
  }
};

// Update a Product identified by the id in the request
exports.update = async (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).json({
      message: "Data to update cannot be empty!"
    });
  }

  try {
    const updated = await Product.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({
        message: `Cannot update Product with id=${req.params.id}. Maybe Product was not found!`
      });
    }
    res.json({ message: "Product was updated successfully." });
  } catch (err) {
    res.status(500).json({
      message: `Error updating Product with id=${req.params.id}`
    });
  }
};

// Delete a Product with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const deleted = await Product.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        message: `Cannot delete Product with id=${req.params.id}. Maybe Product was not found!`
      });
    }
    res.json({
      message: "Product was deleted successfully!"
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete Product with id=${req.params.id}`
    });
  }
};
