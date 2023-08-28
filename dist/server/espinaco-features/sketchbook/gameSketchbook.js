"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = __importDefault(require("../../game"));
class GameSketchbook extends game_1.default {
    constructor(io) {
        super(io);
        // Los console.log del server se miran en terminal, no en el navegador
        console.log('sketchbookGame Server run! v1 ===========');
    }
}
exports.default = GameSketchbook;
