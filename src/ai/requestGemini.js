import dotenv from 'dotenv';
dotenv.config();
import { GoogleGenerativeAI } from '@google/generative-ai';
export const apiKey = process.env.API_KEY;
export const modelName = process.env.MODEL_NAME;

export default async function requestGemini(prompt) {
	try {
		const genAI = new GoogleGenerativeAI(apiKey);
		const model = genAI.getGenerativeModel({ model: modelName });
		let result = await model.generateContent(prompt);
		return result.response.text();
	} catch (e) {
		throw new Error('Gemini cannot answer')
	}
}