import express from 'express';
import requestGemini from './src/ai/requestGemini.js';
import isApiKeyValid from './src/utils/isApiKeyValid.js';
import cors from 'cors';

const corsOptions ={
	origin: 'https://mbti-survey-app--mbti-survey-app.us-central1.hosted.app',
	credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type, Authorization',
}

const app = express();
const port = 8000;
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
	res.send('Hello, World!');
});

app.post('/ask/gemini', async (req, res) => {
	try {
		const apiKey = req.headers['authorization'] || req.query.apiKey;
		if (!isApiKeyValid(apiKey)) {
			throw new Error('Unauthorized: wrong api key');
		}
		const prompt = req.body.text;
		const geminiAnswers = await requestGemini(prompt);
		res.status(200).send(geminiAnswers)
	} catch (e) {
		res.status(500).send('Gemini cannot answer')
	}
});

app.options('/ask/gemini', (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  res.sendStatus(200);
});

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}`);
});