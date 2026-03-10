import createError from 'http-errors';
import { verifyToken } from '../utils/jwt.js';
import { userRepository } from '../repositories/userRepository.js';

export const authMiddleware = async (req, _res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      throw createError(401, 'Authentication token is required');
    }

    const token = header.split(' ')[1];
    const payload = verifyToken(token);
    const user = await userRepository.findById(payload.userId);

    if (!user) {
      throw createError(401, 'User session is invalid');
    }

    req.user = {
      id: user.id,
      tenantId: user.tenant_id,
      email: user.email,
      role: user.role,
      fullName: user.full_name
    };

    next();
  } catch (error) {
    next(error.status ? error : createError(401, 'Invalid or expired token'));
  }
};
