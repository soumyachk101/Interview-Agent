import pdf from 'pdf-parse';
import mammoth from 'mammoth';

export const extractTextFromPDF = async (buffer: Buffer) => {
    const data = await (pdf as any)(buffer);
    return data.text;
};

export const extractTextFromDocx = async (buffer: Buffer) => {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
};
