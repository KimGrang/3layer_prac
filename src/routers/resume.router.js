import express from 'express';
import jwtValidate from '../middleware/jwt-validate.middleware.js';
import resumeController from '../controllers/resume.controller.js'

const router = express.Router();

router.get('/', resumeController.getAllResumes);
router.get('/:resumeId', resumeController.getResumeById);
router.post('/', jwtValidate, resumeController.createResume);
router.patch('/:resumeId', jwtValidate, resumeController.updateResume);
router.delete('/:resumeId', jwtValidate, resumeController.deleteResume);

export default router;