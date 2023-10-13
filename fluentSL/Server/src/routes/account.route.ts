import { Router } from 'express';
import accountController from '../Controller/account.controller';
import AuthGuard from '../utils/authGuard';
import validate from '../utils/validator';
import { body } from 'express-validator';

export const accountRoute = Router();

accountRoute.post(
  '/createAccount',
  validate([
    body('fname').exists().isString(),
    body('lname').exists().isString(),
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Enter an Valid Email '),
    body('password')
      .isString()
      .isLength({ min: 8 })
      .withMessage('Password needs have atleast 8 characters '),
  ]),
  accountController.signUp,
);
accountRoute.post('/login',validate([
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Enter an Valid Email '),
  body('password')
    .isString()
    .isLength({ min: 8 })
    .withMessage('Password needs have atleast 8 characters '),
]), accountController.login);
accountRoute.get('/currentUser', AuthGuard, accountController.getCurrentUser);
accountRoute.post('/sendOTP', accountController.sendOTP);
accountRoute.post('/verifyOTP', accountController.verifyOTP);
