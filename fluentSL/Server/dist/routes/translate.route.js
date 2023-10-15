"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateSentenceRoute = void 0;
const express_1 = require("express");
const translate_controller_1 = __importDefault(require("../Controller/translate.controller"));
exports.translateSentenceRoute = (0, express_1.Router)();
exports.translateSentenceRoute.post('/translate', translate_controller_1.default.translateSentence);
