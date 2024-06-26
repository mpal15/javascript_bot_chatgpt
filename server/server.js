import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
const openaiEndpoint = 'https://api.openai.com/v1/chat/completions';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
res.status(200).send({
message: 'Hello from CodeX!',
});
});

app.post('/', async (req, res) => {
try {
const prompt = req.body.prompt;

const response = await axios.post(
  openaiEndpoint,
  {
    model: 'gpt-3.5-turbo-1106',
   
    messages: [
      { role: 'system', content: 'You are a javascript expert. To give the anser of questions user ask about javascript.if user ask anything except javascript and js related concept then give anwer i am not expert this queartion you ask .' },
      { role: 'user', content: prompt },
    ],
  },
  {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
  }
);

const output = response.data.choices[0].message.content;
res.status(200).send({
  bot: output,
});
} catch (error) {
console.log(error);
res.status(500).send(error || 'Something went wrong');
}
});

app.listen(5000, () => console.log('AI server started on http://localhost:5000'));



