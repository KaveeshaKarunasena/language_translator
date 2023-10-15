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
const History_1 = __importDefault(require("../model/History"));
const history_service_1 = __importDefault(require("../service/history.service"));
const createUserHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { title, description, user_id } = req.body;
        const newHistory = yield history_service_1.default.addHistory(user_id, title, description);
        res.status(200).send(newHistory);
    }
    catch (err) {
        res.status(400).send({ err: 'not created' });
    }
});
const getUserHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('here');
    try {
        const { id } = req.params;
        yield History_1.default.find({ user_id: id }).then((history) => res.status(200).send(history));
    }
    catch (err) {
        res.status(404).send({ err: 'There is no history found' });
    }
});
const deleteUserHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('delete');
        const { _id } = req.params;
        yield History_1.default.findByIdAndDelete(_id).then(() => res.status(200).send({ message: 'History deleted successfuly' }));
    }
    catch (err) {
        res.status(404).send({ err: 'Something went wrong' });
    }
});
exports.default = {
    createUserHistory,
    getUserHistory,
    deleteUserHistory,
};
