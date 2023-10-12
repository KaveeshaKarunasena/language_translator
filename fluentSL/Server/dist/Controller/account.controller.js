"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const account_model_1 = __importDefault(require("../model/account/account.model"));
const auth_service_1 = __importDefault(require("../utils/auth.service"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const OTP_1 = __importDefault(require("../model/OTP"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dto = req.body;
        const newAcc = yield auth_service_1.default.register(dto);
        res.status(200).json(newAcc);
    }
    catch (err) {
        res.status(400).json({ err: err });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const response = yield auth_service_1.default.login(email, password);
        res.status(200).json(response);
    }
    catch (err) {
        res.status(400).json({ err: err });
    }
});
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.currentUser.id;
        const user = yield account_model_1.default.findById(userId);
        return res.status(200).json({ user: user });
    }
    catch (err) {
        throw err;
    }
});
const sendOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('here');
    const email = req.body.email;
    console.log(email);
    let generatedOTP = Math.floor(Math.random() * 10000);
    let transporter = nodemailer_1.default.createTransport({
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
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        const createdAt = Date.now();
        const expiredAt = Date.now() + 300000;
        const newOTP = new OTP_1.default({
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
            .catch((err) => {
            console.log(err);
        });
    });
});
const verifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.values.email;
    const receivedOTP = req.body.otp;
    OTP_1.default
        .findOne({ email: email, otp: receivedOTP })
        .then((otp) => {
        if (otp) {
            if (otp.expiredAt > Date.now()) {
                OTP_1.default.deleteMany({ email: email }).catch((error) => {
                    console.log(error);
                });
                res.json('verified');
            }
            else {
                OTP_1.default.deleteMany({ email: email }).catch((error) => {
                    console.log(error);
                });
                res.json('expired');
            }
        }
        else {
            res.json('invalid');
        }
    })
        .catch((err) => {
        console.log(err);
    });
});
exports.default = {
    signUp,
    login,
    getCurrentUser,
    sendOTP,
    verifyOTP,
};
