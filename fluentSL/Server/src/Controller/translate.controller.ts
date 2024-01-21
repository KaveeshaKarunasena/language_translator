import { Request, Response } from 'express';
import { spawn } from 'child_process';
import HistoryModel from '../model/History';

const translateSentence = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    const pyResponse2 = spawn('python', [
      '../TranslationEngin/Singlish_Stemmer.py',
      title,
    ]);

    pyResponse2.stdout.on('data', async (data: any) => {
      const options = {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: 'Bearer YDTt3RIuDl6iHKQwgVcK9Cqt9hBScZiN',
        },
        body: JSON.stringify({ style: 'general', text: `${data}` }),
      };
      try {
        const response = await fetch(
          'https://api.ai21.com/studio/v1/paraphrase',
          options,
        );
        const data = await response.json();
        console.log(data.suggestions)
        res.json(data.suggestions[0]);
      } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
      }
    });

    pyResponse2.stderr.on('data', (data: any) => {
      console.log(`error : ${data}`);
    });
  } catch (err) {
    res.status(400).send({ err: 'not created' });
  }
};

export default {
  translateSentence,
};
