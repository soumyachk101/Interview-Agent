import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export const parseResumeAI = async (rawText: string) => {
    const prompt = `
    Analyze the following resume text and extract the information in JSON format:
    {
      "skills": ["string"],
      "experience": [{"company": "string", "role": "string", "duration": "string", "description": "string"}],
      "education": [{"institution": "string", "degree": "string", "year": "string", "gpa": "string"}],
      "projects": [{"name": "string", "techStack": ["string"], "description": "string"}]
    }
    
    Resume Text:
    ${rawText}
  `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
};

export const generateNextQuestion = async (sessionData: any) => {
    const { resumeData, history, domain, difficulty } = sessionData;

    const prompt = `
    You are an expert AI Interviewer. 
    Context:
    - Domain: ${domain}
    - Difficulty: ${difficulty}
    - Candidate Resume Data: ${JSON.stringify(resumeData)}
    - Conversation History: ${JSON.stringify(history)}
    
    Task:
    Generate the next interview question. It should be challenging, relevant to the candidate's specific experience, and follow-up on their previous answer if applicable.
    
    Return only the question text.
  `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
};

export const evaluateSessionAI = async (sessionData: any) => {
    const { resumeData, history } = sessionData;

    const prompt = `
    Evaluate this interview session and generate a detailed report in JSON format:
    {
      "overallScore": number (0-100),
      "grade": "Excellent" | "Good" | "Average" | "Needs Improvement",
      "strengths": ["string"],
      "improvementAreas": ["string"],
      "questionFeedback": [{"question": "string", "candidateAnswer": "string", "score": number, "feedback": "string"}],
      "overallSummary": "string"
    }
    
    Candidate Data: ${JSON.stringify(resumeData)}
    Conversation History: ${JSON.stringify(history)}
  `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
};
