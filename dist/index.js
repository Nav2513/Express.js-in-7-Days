"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cookieValidator_1 = require("./cookieValidator");
const app = (0, express_1.default)();
async function validateCookies(req, res, next) {
    try {
        await (0, cookieValidator_1.cookieValidator)(req.cookies);
        next();
    }
    catch (err) {
        next(err);
    }
}
app.use((0, cookie_parser_1.default)());
app.use(validateCookies);
// Error handler
app.use((err, req, res, next) => {
    res.status(400).send(err.message);
});
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
