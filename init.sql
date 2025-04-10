-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS inventory_db;
USE inventory_db;

-- Create tables
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS suppliers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  contact_name VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INT DEFAULT 0,
  category_id INT,
  supplier_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE SET NULL
);

-- Insert sample data
INSERT INTO categories (name, description) VALUES 
('Electronics', 'Electronic devices and accessories'),
('Clothing', 'Apparel and fashion items'),
('Food', 'Edible products');

INSERT INTO suppliers (name, contact_name, email, phone, address) VALUES 
('Tech Supplies Inc.', 'John Smith', 'john@techsupplies.com', '555-1234', '123 Tech St, Silicon Valley, CA'),
('Fashion Wholesale', 'Maria Garcia', 'maria@fashionwholesale.com', '555-5678', '456 Fashion Ave, New York, NY'),
('Food Distributors', 'Robert Johnson', 'robert@fooddist.com', '555-9012', '789 Food Blvd, Chicago, IL');

INSERT INTO products (name, description, price, stock, category_id, supplier_id) VALUES 
('Smartphone', 'Latest model smartphone', 799.99, 50, 1, 1),
('Laptop', 'High performance laptop', 1299.99, 30, 1, 1),
('T-shirt', 'Cotton t-shirt', 19.99, 100, 2, 2),
('Jeans', 'Denim jeans', 49.99, 75, 2, 2),
('Chocolate', 'Premium chocolate bar', 3.99, 200, 3, 3),
('Coffee', 'Gourmet coffee beans', 12.99, 150, 3, 3);
