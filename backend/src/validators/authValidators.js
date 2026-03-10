import Joi from 'joi';

export const registerSchema = Joi.object({
  tenantId: Joi.number().integer().positive().required(),
  fullName: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().max(255).required(),
  password: Joi.string().min(8).max(72).required(),
  role: Joi.string().valid('admin', 'manager', 'viewer').default('viewer')
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});
