import express, { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { historyRoute } from './routes/history.route';
import { accountRoute } from './routes/account.route';
import { paraphraseRoute } from './routes/grammerChecker.route';
import { translateSentenceRoute } from './routes/translate.route';

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

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});

app.use('/translate', translateSentenceRoute);
app.use('/paraphrase', paraphraseRoute);
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
