import { pool } from '../db/pool.js';

export const userRepository = {
  async create(data) {
    const [result] = await pool.query(
      `INSERT INTO users (tenant_id, full_name, email, password_hash, role)
       VALUES (?, ?, ?, ?, ?)`,
      [data.tenantId, data.fullName, data.email, data.passwordHash, data.role]
    );

    return this.findById(result.insertId);
  },

  async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0] || null;
  },

  async findById(id) {
    const [rows] = await pool.query(
      `SELECT u.*, t.name AS tenant_name, t.status AS tenant_status
       FROM users u
       INNER JOIN tenants t ON t.id = u.tenant_id
       WHERE u.id = ?`,
      [id]
    );
    return rows[0] || null;
  }
};
