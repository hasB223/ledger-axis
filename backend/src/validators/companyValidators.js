import Joi from 'joi';

export const companyListSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20)
});

export const companySearchSchema = Joi.object({
  q: Joi.string().allow('').default(''),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20)
});

export const companyCreateSchema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
  registrationNumber: Joi.string().min(3).max(100).required(),
  industry: Joi.string().min(2).max(120).required(),
  revenue: Joi.number().min(0).precision(2).required(),
  employeeCount: Joi.number().integer().min(0).required()
});

export const companyUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(255),
  registrationNumber: Joi.string().min(3).max(100),
  industry: Joi.string().min(2).max(120),
  revenue: Joi.number().min(0).precision(2),
  employeeCount: Joi.number().integer().min(0)
}).min(1);
