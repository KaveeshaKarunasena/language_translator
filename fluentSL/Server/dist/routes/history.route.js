"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.historyRoute = void 0;
const express_1 = require("express");
const history_controller_1 = __importDefault(require("../Controller/history.controller"));
exports.historyRoute = (0, express_1.Router)();
exports.historyRoute.post('/create', history_controller_1.default.createUserHistory);
exports.historyRoute.get('/getHistory', history_controller_1.default.getUserHistory);
exports.historyRoute.delete('/deleteHistory/:_id', history_controller_1.default.deleteUserHistory);
