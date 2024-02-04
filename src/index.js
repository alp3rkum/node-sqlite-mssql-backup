"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 8081;
app.get('/', (req, res) => {
    res.send('This is the index endpoint of the backend API.');
});
app.get('/helo', (req, res) => {
    res.send("Hello World!");
});
app.listen(port, () => {
    console.log(`Server is listening the port ${port}`);
});
