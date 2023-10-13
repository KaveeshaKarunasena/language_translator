import { Router } from 'express';
import historyController from '../Controller/history.controller';
import AuthGuard from '../utils/authGuard';

export const historyRoute = Router();

historyRoute.post('/create',AuthGuard,  historyController.createUserHistory);
historyRoute.get('/getHistoryByUser/:id', AuthGuard, historyController.getUserHistory);
historyRoute.delete('/deleteHistory/:_id', AuthGuard, historyController.deleteUserHistory);
