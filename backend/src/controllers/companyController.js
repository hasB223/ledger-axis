import { companyService } from '../services/companyService.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const companyController = {
  async list(req, res) {
    const { page, limit } = req.query;
    const data = await companyService.listCompanies(req.user.tenantId, Number(page), Number(limit));
    sendSuccess(res, data);
  },

  async getById(req, res) {
    const data = await companyService.getCompany(req.user.tenantId, Number(req.params.id));
    sendSuccess(res, data);
  },

  async search(req, res) {
    const { q, page, limit } = req.query;
    const data = await companyService.searchCompanies(req.user.tenantId, q, Number(page), Number(limit));
    sendSuccess(res, data);
  },

  async create(req, res) {
    const data = await companyService.createCompany(req.user.tenantId, req.body);
    sendSuccess(res, data, 201);
  },

  async update(req, res) {
    const data = await companyService.updateCompany(req.user.tenantId, Number(req.params.id), req.body);
    sendSuccess(res, data);
  },

  async remove(req, res) {
    const data = await companyService.deleteCompany(req.user.tenantId, Number(req.params.id));
    sendSuccess(res, data);
  },

  async directors(req, res) {
    const data = await companyService.getCompanyDirectors(req.user.tenantId, Number(req.params.id));
    sendSuccess(res, data);
  }
};
