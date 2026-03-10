import { analyticsRepository } from '../repositories/analyticsRepository.js';
import { companyRepository } from '../repositories/companyRepository.js';

export const analyticsService = {
  async getIndustrySummary(tenantId) {
    return analyticsRepository.getIndustrySummary(tenantId);
  },

  async getTopCompanies(tenantId, limit = 10) {
    return analyticsRepository.getTopCompanies(tenantId, limit);
  },

  async getAdvancedQueryExamples(tenantId, companyId = null) {
    const leftJoin = await companyRepository.listCompaniesWithOptionalDirectors(tenantId, 1, 10);
    const multiTable = companyId
      ? await companyRepository.findCompanyTenantDirectorDetails(tenantId, companyId)
      : [];
    const directorCounts = await companyRepository.listDirectorCountPerCompany(tenantId);
    const having = await companyRepository.listCompaniesHavingMinDirectors(tenantId, 4);
    const topRevenue = await companyRepository.listTopCompaniesByRevenue(tenantId, 10);

    return {
      leftJoin,
      multiTable,
      topRevenue,
      directorCounts: directorCounts.slice(0, 10),
      having: having.slice(0, 10)
    };
  }
};
