import { analyticsService } from '../services/analyticsService.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const analyticsController = {
  async industrySummary(req, res) {
    const data = await analyticsService.getIndustrySummary(req.user.tenantId);
    sendSuccess(res, data);
  },

  async topCompanies(req, res) {
    const limit = Number(req.query.limit || 10);
    const data = await analyticsService.getTopCompanies(req.user.tenantId, limit);
    sendSuccess(res, data);
  },

  async advancedQueries(req, res) {
    const companyId = req.query.companyId ? Number(req.query.companyId) : null;
    const data = await analyticsService.getAdvancedQueryExamples(req.user.tenantId, companyId);
    sendSuccess(res, data);
  }
};
