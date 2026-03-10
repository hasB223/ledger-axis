import { Router } from 'express';
import { companyController } from '../controllers/companyController.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { validate } from '../middleware/validate.js';
import {
  companyCreateSchema,
  companyListSchema,
  companySearchSchema,
  companyUpdateSchema
} from '../validators/companyValidators.js';

const router = Router();

router.get('/', validate(companyListSchema, 'query'), asyncHandler(companyController.list));
router.get('/search', validate(companySearchSchema, 'query'), asyncHandler(companyController.search));
router.get('/:id/directors', asyncHandler(companyController.directors));
router.get('/:id', asyncHandler(companyController.getById));
router.post('/', validate(companyCreateSchema), asyncHandler(companyController.create));
router.put('/:id', validate(companyUpdateSchema), asyncHandler(companyController.update));
router.delete('/:id', asyncHandler(companyController.remove));

export default router;
