import { Request, Response } from 'express';

const translateSentence = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    const { spawn } = require('child_process');

    const pyResponse = spawn('python', ['Singlish_Stemmer.py', 'listToStr']);

    console.log(pyResponse);
  } catch (err) {
    res.status(400).send({ err: 'not created' });
  }
};

export default {
  translateSentence,
};
