import { pool } from '../db/pool.js';

export const tenantRepository = {
  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM tenants WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async listActive() {
    const [rows] = await pool.query(
      'SELECT id, name, status, created_at FROM tenants WHERE status = ? ORDER BY name ASC',
      ['active']
    );
    return rows;
  }
};
