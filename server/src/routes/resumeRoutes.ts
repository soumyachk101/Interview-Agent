import express from 'express';
import multer from 'multer';
import { uploadResume, getResumes } from '../controllers/resumeController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', protect, upload.single('resume'), uploadResume);
router.get('/', protect, getResumes);

export default router;
