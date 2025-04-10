const Supplier = require('../models/supplier.model');

// Create and Save a new Supplier
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name) {
    return res.status(400).json({
      message: "Name is a required field"
    });
  }

  try {
    // Create a Supplier
    const supplier = {
      name: req.body.name,
      contact_name: req.body.contact_name || "",
      email: req.body.email || "",
      phone: req.body.phone || "",
      address: req.body.address || ""
    };

    // Save Supplier in the database
    const data = await Supplier.create(supplier);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while creating the Supplier."
    });
  }
};

// Retrieve all Suppliers from the database
exports.findAll = async (req, res) => {
  try {
    const data = await Supplier.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Some error occurred while retrieving suppliers."
    });
  }
};

// Find a single Supplier with an id
exports.findOne = async (req, res) => {
  try {
    const data = await Supplier.getById(req.params.id);
    if (!data) {
      return res.status(404).json({
        message: `Supplier with id ${req.params.id} not found`
      });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: `Error retrieving Supplier with id ${req.params.id}`
    });
  }
};

// Update a Supplier identified by the id in the request
exports.update = async (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).json({
      message: "Data to update cannot be empty!"
    });
  }

  try {
    const updated = await Supplier.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({
        message: `Cannot update Supplier with id=${req.params.id}. Maybe Supplier was not found!`
      });
    }
    res.json({ message: "Supplier was updated successfully." });
  } catch (err) {
    res.status(500).json({
      message: `Error updating Supplier with id=${req.params.id}`
    });
  }
};

// Delete a Supplier with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const deleted = await Supplier.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        message: `Cannot delete Supplier with id=${req.params.id}. Maybe Supplier was not found!`
      });
    }
    res.json({
      message: "Supplier was deleted successfully!"
    });
  } catch (err) {
    res.status(500).json({
      message: `Could not delete Supplier with id=${req.params.id}`
    });
  }
};

// Find all products from a supplier
exports.findProducts = async (req, res) => {
  try {
    const data = await Supplier.getProducts(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || `Error retrieving products for supplier with id ${req.params.id}`
    });
  }
};
