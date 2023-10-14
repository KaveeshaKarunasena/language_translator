import { Request, Response } from 'express';

const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    Authorization: 'Bearer YDTt3RIuDl6iHKQwgVcK9Cqt9hBScZiN',
  },
  body: JSON.stringify({ style: 'general', text: 'today viva is very hard' }),
};

const paraphraseSentence = async (req: Request, res: Response) => {
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
};

export default {
  paraphraseSentence,
};
