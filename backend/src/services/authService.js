import bcrypt from 'bcrypt';
import createError from 'http-errors';
import { tenantRepository } from '../repositories/tenantRepository.js';
import { userRepository } from '../repositories/userRepository.js';
import { signToken } from '../utils/jwt.js';

export const authService = {
  async register(payload) {
    const tenant = await tenantRepository.findById(payload.tenantId);
    if (!tenant || tenant.status !== 'active') {
      throw createError(400, 'Tenant is invalid or inactive');
    }

    const existingUser = await userRepository.findByEmail(payload.email);
    if (existingUser) {
      throw createError(409, 'Email is already in use');
    }

    const passwordHash = await bcrypt.hash(payload.password, 10);
    const user = await userRepository.create({
      ...payload,
      passwordHash
    });

    const token = signToken({ userId: user.id, tenantId: user.tenant_id, role: user.role });

    return {
      token,
      user: {
        id: user.id,
        tenantId: user.tenant_id,
        fullName: user.full_name,
        email: user.email,
        role: user.role,
        tenantName: user.tenant_name
      }
    };
  },

  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw createError(401, 'Invalid email or password');
    }

    const passwordMatches = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatches) {
      throw createError(401, 'Invalid email or password');
    }

    const hydratedUser = await userRepository.findById(user.id);
    if (hydratedUser.tenant_status !== 'active') {
      throw createError(403, 'Tenant is inactive');
    }

    const token = signToken({
      userId: hydratedUser.id,
      tenantId: hydratedUser.tenant_id,
      role: hydratedUser.role
    });

    return {
      token,
      user: {
        id: hydratedUser.id,
        tenantId: hydratedUser.tenant_id,
        fullName: hydratedUser.full_name,
        email: hydratedUser.email,
        role: hydratedUser.role,
        tenantName: hydratedUser.tenant_name
      }
    };
  },

  async getCurrentUser(userId) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw createError(404, 'User not found');
    }

    return {
      id: user.id,
      tenantId: user.tenant_id,
      fullName: user.full_name,
      email: user.email,
      role: user.role,
      tenantName: user.tenant_name
    };
  }
};
