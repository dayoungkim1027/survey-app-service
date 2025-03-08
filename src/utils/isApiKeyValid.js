import dotenv from 'dotenv';
dotenv.config();

export const validApiKey = process.env.API_KEY_CLIENT;

export default function isApiKeyValid(apiKey) {
	if (!apiKey || apiKey !== validApiKey) {
		return false;
	}
	return true;
}