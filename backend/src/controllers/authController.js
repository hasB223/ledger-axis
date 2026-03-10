import { authService } from '../services/authService.js';
import { sendSuccess } from '../utils/apiResponse.js';

export const authController = {
  async register(req, res) {
    const result = await authService.register(req.body);
    sendSuccess(res, result, 201);
  },

  async login(req, res) {
    const result = await authService.login(req.body);
    sendSuccess(res, result);
  },

  async me(req, res) {
    const result = await authService.getCurrentUser(req.user.id);
    sendSuccess(res, result);
  }
};
