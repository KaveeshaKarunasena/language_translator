import { Router } from 'express';
import historyController from '../Controller/history.controller';
import AuthGuard from '../utils/authGuard';
import translateSentence from '../Controller/translate.controller';

export const translateSentenceRoute = Router();

translateSentenceRoute.post('/translate', translateSentence.translateSentence);
