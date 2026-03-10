import { pool } from '../db/pool.js';

export const analyticsRepository = {
  async getIndustrySummary(tenantId) {
    const [rows] = await pool.query(
      `SELECT industry, COUNT(*) AS company_count, ROUND(AVG(revenue), 2) AS avg_revenue
       FROM companies
       WHERE tenant_id = ?
       GROUP BY industry
       ORDER BY company_count DESC, industry ASC`,
      [tenantId]
    );
    return rows;
  },

  async getTopCompanies(tenantId, limit = 10) {
    const [rows] = await pool.query(
      `SELECT c.id, c.name, c.industry, c.revenue, c.employee_count, COUNT(cd.director_id) AS director_count
       FROM companies c
       LEFT JOIN company_directors cd ON cd.company_id = c.id
       WHERE c.tenant_id = ?
       GROUP BY c.id, c.name, c.industry, c.revenue, c.employee_count
       ORDER BY c.revenue DESC, director_count DESC
       LIMIT ?`,
      [tenantId, limit]
    );
    return rows;
  }
};
