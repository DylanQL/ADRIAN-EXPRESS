const pool = require('../config/db.config');

class Product {
  static async getAll() {
    try {
      const [rows] = await pool.query(`
        SELECT p.*, c.name as category_name, s.name as supplier_name 
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN suppliers s ON p.supplier_id = s.id
      `);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const [rows] = await pool.query(`
        SELECT p.*, c.name as category_name, s.name as supplier_name 
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN suppliers s ON p.supplier_id = s.id
        WHERE p.id = ?
      `, [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async create(product) {
    try {
      const [result] = await pool.query(
        'INSERT INTO products (name, description, price, stock, category_id, supplier_id) VALUES (?, ?, ?, ?, ?, ?)',
        [product.name, product.description, product.price, product.stock, product.category_id, product.supplier_id]
      );
      return { id: result.insertId, ...product };
    } catch (error) {
      throw error;
    }
  }

  static async update(id, product) {
    try {
      const [result] = await pool.query(
        'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category_id = ?, supplier_id = ? WHERE id = ?',
        [product.name, product.description, product.price, product.stock, product.category_id, product.supplier_id, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Product;
