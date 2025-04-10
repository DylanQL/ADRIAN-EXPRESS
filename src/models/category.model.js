const pool = require('../config/db.config');

class Category {
  static async getAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM categories');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async create(category) {
    try {
      const [result] = await pool.query(
        'INSERT INTO categories (name, description) VALUES (?, ?)',
        [category.name, category.description]
      );
      return { id: result.insertId, ...category };
    } catch (error) {
      throw error;
    }
  }

  static async update(id, category) {
    try {
      const [result] = await pool.query(
        'UPDATE categories SET name = ?, description = ? WHERE id = ?',
        [category.name, category.description, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const [result] = await pool.query('DELETE FROM categories WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  static async getProducts(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM products WHERE category_id = ?', [id]);
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Category;
