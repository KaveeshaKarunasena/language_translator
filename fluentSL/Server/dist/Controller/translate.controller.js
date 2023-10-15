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
const child_process_1 = require("child_process");
const translateSentence = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const pyResponse2 = (0, child_process_1.spawn)('python', [
            '../TranslationEngin/Singlish_Stemmer.py',
            title,
        ]);
        pyResponse2.stdout.on('data', (data) => __awaiter(void 0, void 0, void 0, function* () {
            const options = {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: 'Bearer YDTt3RIuDl6iHKQwgVcK9Cqt9hBScZiN',
                },
                body: JSON.stringify({ style: 'general', text: `${data}` }),
            };
            try {
                const response = yield fetch('https://api.ai21.com/studio/v1/paraphrase', options);
                const data = yield response.json();
                res.json(data.suggestions[0]);
            }
            catch (error) {
                res.status(500).json({ error: 'An error occurred' });
            }
        }));
        pyResponse2.stderr.on('data', (data) => {
            console.log(`error : ${data}`);
        });
    }
    catch (err) {
        res.status(400).send({ err: 'not created' });
    }
});
exports.default = {
    translateSentence,
};
