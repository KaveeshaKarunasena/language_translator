import express, { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { historyRoute } from './routes/history.route';
import { accountRoute } from './routes/account.route';

require('dotenv').config();

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: 'Bearer YDTt3RIuDl6iHKQwgVcK9Cqt9hBScZiN',
  },
  body: JSON.stringify({ style: 'general', text: 'today viva is very hard' }),
};

app.post('/paraphrase', async (req, res) => {
  try {
    const response = await fetch(
      'https://api.ai21.com/studio/v1/paraphrase',
      options,
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

app.use('/userhistory', historyRoute);
app.use('/account', accountRoute);

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log('MongoDB connected');
  app.on('error', (e) => {
    console.log(e);
  });
  app.listen(port, () => {
    console.log(`TypeScript with Express
         http://localhost:${port}/`);
  });
});
