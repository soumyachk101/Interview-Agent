import { Request, Response } from 'express';
import { Resume } from '../models/Resume';
import { extractTextFromPDF, extractTextFromDocx } from '../services/resumeParser';
import { parseResumeAI } from '../services/aiService';
import cloudinary from '../config/cloudinary';
import fs from 'fs';

export const uploadResume = async (req: any, res: Response) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

        const buffer = fs.readFileSync(req.file.path);
        let text = '';

        if (req.file.mimetype === 'application/pdf') {
            text = await extractTextFromPDF(buffer);
        } else if (req.file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            text = await extractTextFromDocx(buffer);
        } else {
            return res.status(400).json({ message: 'Unsupported file type' });
        }

        // AI Analysis
        const parsedData = await parseResumeAI(text);

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'interview_agent/resumes',
        });

        const resume = await Resume.create({
            userId: req.user._id,
            label: req.body.label || 'My Resume',
            fileUrl: result.secure_url,
            filePublicId: result.public_id,
            fileType: req.file.mimetype.includes('pdf') ? 'pdf' : 'docx',
            fileSizeBytes: req.file.size,
            parsedData,
            isParsingComplete: true,
        });

        // Cleanup temp file
        fs.unlinkSync(req.file.path);

        res.status(201).json(resume);
    } catch (error: any) {
        if (req.file) fs.unlinkSync(req.file.path);
        res.status(500).json({ message: error.message });
    }
};

export const getResumes = async (req: any, res: Response) => {
    try {
        const resumes = await Resume.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json(resumes);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
