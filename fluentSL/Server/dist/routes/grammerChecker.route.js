"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paraphraseRoute = void 0;
const express_1 = require("express");
const paraphrase_controller_1 = __importDefault(require("../Controller/paraphrase.controller"));
exports.paraphraseRoute = (0, express_1.Router)();
exports.paraphraseRoute.post('/checkGrammer', paraphrase_controller_1.default.paraphraseSentence);
