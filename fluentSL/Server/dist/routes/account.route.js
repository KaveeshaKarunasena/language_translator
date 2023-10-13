"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountRoute = void 0;
const express_1 = require("express");
const account_controller_1 = __importDefault(require("../Controller/account.controller"));
const authGuard_1 = __importDefault(require("../utils/authGuard"));
const validator_1 = __importDefault(require("../utils/validator"));
const express_validator_1 = require("express-validator");
exports.accountRoute = (0, express_1.Router)();
exports.accountRoute.post('/createAccount', (0, validator_1.default)([
    (0, express_validator_1.body)('fname').exists().isString(),
    (0, express_validator_1.body)('lname').exists().isString(),
    (0, express_validator_1.body)('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Enter an Valid Email '),
    (0, express_validator_1.body)('password')
        .isString()
        .isLength({ min: 8 })
        .withMessage('Password needs have atleast 8 characters '),
]), account_controller_1.default.signUp);
exports.accountRoute.post('/login', (0, validator_1.default)([
    (0, express_validator_1.body)('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Enter an Valid Email '),
    (0, express_validator_1.body)('password')
        .isString()
        .isLength({ min: 8 })
        .withMessage('Password needs have atleast 8 characters '),
]), account_controller_1.default.login);
exports.accountRoute.get('/currentUser', authGuard_1.default, account_controller_1.default.getCurrentUser);
exports.accountRoute.post('/sendOTP', account_controller_1.default.sendOTP);
exports.accountRoute.post('/verifyOTP', account_controller_1.default.verifyOTP);
