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
Object.defineProperty(exports, "__esModule", { value: true });
const options = {
    method: 'POST',
    headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: 'Bearer YDTt3RIuDl6iHKQwgVcK9Cqt9hBScZiN',
    },
    body: JSON.stringify({ style: 'general', text: 'today viva is very hard' }),
};
const paraphraseSentence = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('https://api.ai21.com/studio/v1/paraphrase', options);
        const data = yield response.json();
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});
exports.default = {
    paraphraseSentence,
};
