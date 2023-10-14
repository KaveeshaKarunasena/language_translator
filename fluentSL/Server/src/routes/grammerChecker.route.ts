import { Router } from 'express';
import historyController from '../Controller/history.controller';
import AuthGuard from '../utils/authGuard';
import paraphraseSentence from '../Controller/paraphrase.controller';

export const paraphraseRoute = Router();

paraphraseRoute.post('/checkGrammer', paraphraseSentence.paraphraseSentence);
