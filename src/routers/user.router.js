import express from 'express';
import jwtValidate from '../middleware/jwt-validate.middleware.js';
import userController from '../controllers/user.controller.js';

const router = express.Router();

router.post('/sign-up', userController.signUp);
router.post('/sign-in', userController.signIn);
router.get('/me', jwtValidate, userController.getMe);

export default router;