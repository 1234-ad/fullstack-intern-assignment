import { Router } from 'express';
import {
  signup,
  login,
  getMe,
  requestPasswordReset,
  confirmPasswordReset
} from '../controllers/authController';
import { authenticateToken, requireRole } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import {
  signupSchema,
  loginSchema,
  resetPasswordSchema,
  confirmResetSchema
} from '../validation/auth';

const router = Router();

// Public routes
router.post('/signup', validateRequest(signupSchema), signup);
router.post('/login', validateRequest(loginSchema), login);
router.post('/reset-password', validateRequest(resetPasswordSchema), requestPasswordReset);
router.post('/confirm-reset', validateRequest(confirmResetSchema), confirmPasswordReset);

// Protected routes
router.get('/me', authenticateToken, getMe);

// Admin only routes (example)
router.get('/admin-only', authenticateToken, requireRole(['ADMIN']), (req, res) => {
  res.json({
    success: true,
    message: 'Welcome admin!',
    data: { message: 'This is an admin-only endpoint' }
  });
});

export default router;