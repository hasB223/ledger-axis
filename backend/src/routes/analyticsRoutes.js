import { Router } from 'express';
import { analyticsController } from '../controllers/analyticsController.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const router = Router();

router.get('/industry-summary', asyncHandler(analyticsController.industrySummary));
router.get('/top-companies', asyncHandler(analyticsController.topCompanies));
router.get('/advanced-queries', asyncHandler(analyticsController.advancedQueries));

export default router;
