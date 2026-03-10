import { pool } from '../db/pool.js';

const formatPagination = (page, limit) => ({
  offset: (page - 1) * limit,
  limit
});

export const companyRepository = {
  async listByTenant(tenantId, page, limit) {
    const { offset } = formatPagination(page, limit);
    const [rows] = await pool.query(
      `SELECT id, tenant_id, name, registration_number, industry, revenue, employee_count, created_at
       FROM companies
       WHERE tenant_id = ?
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`,
      [tenantId, limit, offset]
    );

    const [countRows] = await pool.query('SELECT COUNT(*) AS total FROM companies WHERE tenant_id = ?', [
      tenantId
    ]);

    return { rows, total: countRows[0].total };
  },

  async findById(tenantId, companyId) {
    const [rows] = await pool.query(
      `SELECT id, tenant_id, name, registration_number, industry, revenue, employee_count, created_at
       FROM companies
       WHERE tenant_id = ? AND id = ?`,
      [tenantId, companyId]
    );
    return rows[0] || null;
  },

  async create(tenantId, data) {
    const [result] = await pool.query(
      `INSERT INTO companies (tenant_id, name, registration_number, industry, revenue, employee_count)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [tenantId, data.name, data.registrationNumber, data.industry, data.revenue, data.employeeCount]
    );

    return this.findById(tenantId, result.insertId);
  },

  async update(tenantId, companyId, data) {
    const fields = [];
    const values = [];
    const fieldMap = {
      name: 'name',
      registrationNumber: 'registration_number',
      industry: 'industry',
      revenue: 'revenue',
      employeeCount: 'employee_count'
    };

    for (const [key, column] of Object.entries(fieldMap)) {
      if (data[key] !== undefined) {
        fields.push(`${column} = ?`);
        values.push(data[key]);
      }
    }

    values.push(tenantId, companyId);

    await pool.query(
      `UPDATE companies
       SET ${fields.join(', ')}
       WHERE tenant_id = ? AND id = ?`,
      values
    );

    return this.findById(tenantId, companyId);
  },

  async remove(tenantId, companyId) {
    const [result] = await pool.query('DELETE FROM companies WHERE tenant_id = ? AND id = ?', [
      tenantId,
      companyId
    ]);
    return result.affectedRows > 0;
  },

  async searchByName(tenantId, query, page, limit) {
    const { offset } = formatPagination(page, limit);
    const likeQuery = `%${query}%`;

    const [rows] = await pool.query(
      `SELECT id, tenant_id, name, registration_number, industry, revenue, employee_count, created_at
       FROM companies
       WHERE tenant_id = ? AND (name LIKE ? OR registration_number LIKE ?)
       ORDER BY name ASC
       LIMIT ? OFFSET ?`,
      [tenantId, likeQuery, likeQuery, limit, offset]
    );

    const [countRows] = await pool.query(
      `SELECT COUNT(*) AS total
       FROM companies
       WHERE tenant_id = ? AND (name LIKE ? OR registration_number LIKE ?)`,
      [tenantId, likeQuery, likeQuery]
    );

    return { rows, total: countRows[0].total };
  },

  async findCompanyWithDirectors(tenantId, companyId) {
    const [rows] = await pool.query(
      `SELECT c.id AS company_id, c.name AS company_name, c.registration_number, c.industry, c.revenue,
              c.employee_count, d.id AS director_id, d.full_name AS director_name, d.nationality, d.birth_year
       FROM companies c
       INNER JOIN company_directors cd ON cd.company_id = c.id
       INNER JOIN directors d ON d.id = cd.director_id
       WHERE c.tenant_id = ? AND c.id = ?
       ORDER BY d.full_name ASC`,
      [tenantId, companyId]
    );
    return rows;
  },

  async listCompaniesWithOptionalDirectors(tenantId, page, limit) {
    const { offset } = formatPagination(page, limit);
    const [rows] = await pool.query(
      `SELECT c.id, c.name, c.registration_number, c.industry, COUNT(cd.director_id) AS director_count
       FROM companies c
       LEFT JOIN company_directors cd ON cd.company_id = c.id
       WHERE c.tenant_id = ?
       GROUP BY c.id, c.name, c.registration_number, c.industry
       ORDER BY c.name ASC
       LIMIT ? OFFSET ?`,
      [tenantId, limit, offset]
    );
    return rows;
  },

  async findCompanyTenantDirectorDetails(tenantId, companyId) {
    const [rows] = await pool.query(
      `SELECT c.id AS company_id, c.name AS company_name, t.name AS tenant_name,
              d.id AS director_id, d.full_name AS director_name, d.nationality
       FROM companies c
       INNER JOIN tenants t ON t.id = c.tenant_id
       LEFT JOIN company_directors cd ON cd.company_id = c.id
       LEFT JOIN directors d ON d.id = cd.director_id
       WHERE c.tenant_id = ? AND c.id = ?
       ORDER BY d.full_name ASC`,
      [tenantId, companyId]
    );
    return rows;
  },

  async listTopCompaniesByRevenue(tenantId, limit = 10) {
    const [rows] = await pool.query(
      `SELECT id, name, industry, revenue, employee_count
       FROM companies
       WHERE tenant_id = ?
       ORDER BY revenue DESC, employee_count DESC
       LIMIT ?`,
      [tenantId, limit]
    );
    return rows;
  },

  async listDirectorCountPerCompany(tenantId) {
    const [rows] = await pool.query(
      `SELECT c.id, c.name, COUNT(cd.director_id) AS director_count
       FROM companies c
       LEFT JOIN company_directors cd ON cd.company_id = c.id
       WHERE c.tenant_id = ?
       GROUP BY c.id, c.name
       ORDER BY director_count DESC, c.name ASC`,
      [tenantId]
    );
    return rows;
  },

  async listCompaniesHavingMinDirectors(tenantId, minDirectors) {
    const [rows] = await pool.query(
      `SELECT c.id, c.name, COUNT(cd.director_id) AS director_count
       FROM companies c
       LEFT JOIN company_directors cd ON cd.company_id = c.id
       WHERE c.tenant_id = ?
       GROUP BY c.id, c.name
       HAVING COUNT(cd.director_id) >= ?
       ORDER BY director_count DESC, c.name ASC`,
      [tenantId, minDirectors]
    );
    return rows;
  }
};
