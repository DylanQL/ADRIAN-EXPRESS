const Category = require('../models/category.model');

// Create and Save a new Category
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name) {
    return res.status(400).json({
      message: "Name is a required field"
    });
  }

  try {
    // Create a Category
    const category = {
      name: req.body.name,
      description: req.body.description || ""
    };

    // Save Category in the database
    const data = await Category.create(category);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating the Category."
    });
  }
};

// Retrieve all Categories from the database
exports.findAll = async (req, res) => {
  try {
    const data = await Category.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving categories."
    });
  }
};

// Find a single Category with an id
exports.findOne = async (req, res) => {
  try {
    const data = await Category.getById(req.params.id);
    if (!data) {
      return res.status(404).json({
        message: `Category with id ${req.params.id} not found`
      });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: `Error retrieving Category with id ${req.params.id}`
    });
  }
};

// Update a Category identified by the id in the request
exports.update = async (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).json({
      message: "Data to update cannot be empty!"
    });
  }

  try {
    const updated = await Category.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({
        message: `Cannot update Category with id=${req.params.id}. Maybe Category was not found!`
      });
    }
    res.json({ message: "Category was updated successfully." });
  } catch (err) {
    res.status(500).json({
      message: `Error updating Category with id=${req.params.id}`
    });
  }
};

// Delete a Category with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const deleted = await Category.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        message: `Cannot delete Category with id=${req.params.id}. Maybe Category was not found!`
      });
    }
    res.json({
      message: "Category was deleted successfully!"
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete Category with id=${req.params.id}`
    });
  }
};

// Find all products in a category
exports.findProducts = async (req, res) => {
  try {
    const data = await Category.getProducts(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || `Error retrieving products for category with id ${req.params.id}`
    });
  }
};
