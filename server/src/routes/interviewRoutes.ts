import express from 'express';
import { startInterview, submitAnswer, endInterviewAndGenerateReport } from '../controllers/interviewController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/start', protect, startInterview);
router.post('/answer', protect, submitAnswer);
router.post('/end', protect, endInterviewAndGenerateReport);

export default router;
