import { Router } from 'express';
import historyController from '../Controller/history.controller';
export const historyRoute = Router();

historyRoute.post('/create', historyController.createUserHistory);
historyRoute.get('/getHistory', historyController.getUserHistory);
historyRoute.delete('/deleteHistory/:_id', historyController.deleteUserHistory);
