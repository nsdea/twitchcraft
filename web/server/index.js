"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const yamljs_1 = __importDefault(require("yamljs"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
var commands = yamljs_1.default.load(path_1.default.resolve(process.cwd(), '../../config/commands.yml')); // global configs
console.log(commands);
app.get('/', (_req, res) => {
    res.sendFile(path_1.default.resolve(process.cwd(), '../client/index.html'));
});
app.use(express_1.default.static('../client'));
app.listen(3000);
