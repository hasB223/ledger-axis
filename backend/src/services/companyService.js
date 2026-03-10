import createError from 'http-errors';
import { companyRepository } from '../repositories/companyRepository.js';

const normalizePageData = (result, page, limit) => ({
  items: result.rows,
  pagination: {
    page,
    limit,
    total: result.total,
    totalPages: Math.ceil(result.total / limit) || 1
  }
});

const mapCompany = (company) => ({
  id: company.id,
  tenantId: company.tenant_id,
  name: company.name,
  registrationNumber: company.registration_number,
  industry: company.industry,
  revenue: Number(company.revenue),
  employeeCount: company.employee_count,
  createdAt: company.created_at
});

export const companyService = {
  async listCompanies(tenantId, page, limit) {
    const result = await companyRepository.listByTenant(tenantId, page, limit);
    return normalizePageData({ ...result, rows: result.rows.map(mapCompany) }, page, limit);
  },

  async getCompany(tenantId, companyId) {
    const company = await companyRepository.findById(tenantId, companyId);
    if (!company) {
      throw createError(404, 'Company not found');
    }
    return mapCompany(company);
  },

  async createCompany(tenantId, data) {
    const company = await companyRepository.create(tenantId, data);
    return mapCompany(company);
  },

  async updateCompany(tenantId, companyId, data) {
    const existing = await companyRepository.findById(tenantId, companyId);
    if (!existing) {
      throw createError(404, 'Company not found');
    }

    const updated = await companyRepository.update(tenantId, companyId, data);
    return mapCompany(updated);
  },

  async deleteCompany(tenantId, companyId) {
    const deleted = await companyRepository.remove(tenantId, companyId);
    if (!deleted) {
      throw createError(404, 'Company not found');
    }
    return { deleted: true };
  },

  async searchCompanies(tenantId, query, page, limit) {
    const result = await companyRepository.searchByName(tenantId, query, page, limit);
    return normalizePageData({ ...result, rows: result.rows.map(mapCompany) }, page, limit);
  },

  async getCompanyDirectors(tenantId, companyId) {
    const company = await companyRepository.findById(tenantId, companyId);
    if (!company) {
      throw createError(404, 'Company not found');
    }

    const rows = await companyRepository.findCompanyWithDirectors(tenantId, companyId);
    return {
      company: mapCompany(company),
      directors: rows.map((row) => ({
        id: row.director_id,
        fullName: row.director_name,
        nationality: row.nationality,
        birthYear: row.birth_year
      }))
    };
  }
};
