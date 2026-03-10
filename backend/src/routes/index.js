import { Router } from 'express';
import authRoutes from './authRoutes.js';
import companyRoutes from './companyRoutes.js';
import analyticsRoutes from './analyticsRoutes.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/companies', authMiddleware, companyRoutes);
router.use('/analytics', authMiddleware, analyticsRoutes);

export default router;
