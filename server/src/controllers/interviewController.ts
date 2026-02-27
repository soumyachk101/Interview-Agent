import { Request, Response } from 'express';
import { Session } from '../models/Session';
import { Resume } from '../models/Resume';
import { Report } from '../models/Report';
import { generateNextQuestion, evaluateSessionAI } from '../services/aiService';

export const startInterview = async (req: any, res: Response) => {
    try {
        const { resumeId, transactionId, interviewType, domain, difficulty, totalQuestions } = req.body;

        const session = await Session.create({
            userId: req.user._id,
            resumeId,
            transactionId,
            interviewType,
            domain,
            difficulty,
            totalQuestions,
            status: 'active',
            startedAt: new Date(),
        });

        // Generate first question
        const resume = await Resume.findById(resumeId);
        const firstQuestion = await generateNextQuestion({
            resumeData: resume?.parsedData,
            history: [],
            domain,
            difficulty
        });

        session.conversationHistory.push({
            role: 'assistant',
            content: firstQuestion,
        });

        await session.save();

        res.status(201).json(session);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const submitAnswer = async (req: any, res: Response) => {
    try {
        const { sessionId, answer } = req.body;
        const session = await Session.findById(sessionId);

        if (!session) return res.status(404).json({ message: 'Session not found' });

        // Save user answer
        session.conversationHistory.push({
            role: 'user',
            content: answer,
        });

        session.currentQuestion += 1;

        if (session.currentQuestion >= session.totalQuestions) {
            session.status = 'completed';
            session.completedAt = new Date();
            await session.save();
            return res.json({ message: 'Interview completed', isCompleted: true });
        }

        // Generate next question
        const resume = await Resume.findById(session.resumeId);
        const nextQuestion = await generateNextQuestion({
            resumeData: resume?.parsedData,
            history: session.conversationHistory,
            domain: session.domain,
            difficulty: session.difficulty
        });

        session.conversationHistory.push({
            role: 'assistant',
            content: nextQuestion,
        });

        await session.save();
        res.json(session);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const endInterviewAndGenerateReport = async (req: any, res: Response) => {
    try {
        const { sessionId } = req.body;
        const session = await Session.findById(sessionId);

        if (!session) return res.status(404).json({ message: 'Session not found' });

        const resume = await Resume.findById(session.resumeId);
        const evaluation = await evaluateSessionAI({
            resumeData: resume?.parsedData,
            history: session.conversationHistory
        });

        const report = await Report.create({
            sessionId,
            userId: req.user._id,
            ...evaluation
        });

        session.reportId = report._id as any;
        session.status = 'completed';
        session.completedAt = new Date();
        await session.save();

        res.json(report);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
