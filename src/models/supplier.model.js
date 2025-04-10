const pool = require('../config/db.config');

class Supplier {
  static async getAll() {
    try {
      const [rows] = await pool.query('SELECT * FROM suppliers');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM suppliers WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async create(supplier) {
    try {
      const [result] = await pool.query(
        'INSERT INTO suppliers (name, contact_name, email, phone, address) VALUES (?, ?, ?, ?, ?)',
        [supplier.name, supplier.contact_name, supplier.email, supplier.phone, supplier.address]
      );
      return { id: result.insertId, ...supplier };
    } catch (error) {
      throw error;
    }
  }

  static async update(id, supplier) {
    try {
      const [result] = await pool.query(
        'UPDATE suppliers SET name = ?, contact_name = ?, email = ?, phone = ?, address = ? WHERE id = ?',
        [supplier.name, supplier.contact_name, supplier.email, supplier.phone, supplier.address, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const [result] = await pool.query('DELETE FROM suppliers WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  static async getProducts(id) {
    try {
      const [rows] = await pool.query('SELECT * FROM products WHERE supplier_id = ?', [id]);
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Supplier;
