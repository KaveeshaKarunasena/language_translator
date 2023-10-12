import { Request, Response } from 'express';
import { IAccount } from '../model/account/IAccount';
import accountModel from '../model/account/account.model';
import authService from '../utils/auth.service';
import { AnyNaptrRecord } from 'dns';
import nodemailer from 'nodemailer';
import otpModel from '../model/OTP';

const signUp = async (req: Request, res: Response) => {
  try {
    const dto = req.body;
    const newAcc = await authService.register(dto);
    res.status(200).json(newAcc);
  } catch (err: any) {
    res.status(400).json({ err: err });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const response = await authService.login(email, password);
    res.status(200).json(response);
  } catch (err: any) {
    res.status(400).json({ err: err });
  }
};

const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = req.currentUser.id;

    const user = await accountModel.findById(userId);
    return res.status(200).json({ user: user });
  } catch (err: any) {
    throw err;
  }
};

const sendOTP = async (req: Request, res: Response) => {
  console.log('here');
  const email = req.body.email;
  console.log(email);
  let generatedOTP = Math.floor(Math.random() * 10000);

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const otp = generatedOTP;
  let mailOptions = {
    from: process.env.USER_EMAIL,
    to: email,
    subject: 'OTP',
    text: 'here is your otp',
    html: `<b>${otp}</b>`,
  };
  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);

    const createdAt = Date.now();
    const expiredAt = Date.now() + 300000;

    const newOTP = new otpModel({
      email,
      otp,
      createdAt,
      expiredAt,
    });

    newOTP
      .save()
      .then(() => {
        res.json('OTP Added');
      })
      .catch((err: any) => {
        console.log(err);
      });
  });
};

const verifyOTP = async (req: Request, res: Response) => {
  const email = req.body.values.email;
  const receivedOTP = req.body.otp;

  otpModel
    .findOne({ email: email, otp: receivedOTP })
    .then((otp: any) => {
      if (otp) {
        if (otp.expiredAt > Date.now()) {
          otpModel.deleteMany({ email: email }).catch((error: any) => {
            console.log(error);
          });
          res.json('verified');
        } else {
          otpModel.deleteMany({ email: email }).catch((error: any) => {
            console.log(error);
          });
          res.json('expired');
        }
      } else {
        res.json('invalid');
      }
    })
    .catch((err: any) => {
      console.log(err);
    });
};

export default {
  signUp,
  login,
  getCurrentUser,
  sendOTP,
  verifyOTP,
};
