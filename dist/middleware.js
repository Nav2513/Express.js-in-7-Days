"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cookieValidator_1 = require("./experimental/cookieValidator");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
/*
        --- Writing middleware for use in Express apps ---

Middleware functions are function that have access to the
request object(req), the response object(res), and the next
in the application's request-response cycle.
The next function is a function in the Express router which,
when invoked, executes the middleware succeeding the current
middlware.

Middleware functions can perform the following tasks:
-> Execute any code.
-> Make changes to the request and the response objects.
-> End the request-response cycle.
-> Call the next middleware in the stack.

If the current middleware function does not end the
request-response cycle, it must call next() to pass control to
the middleware function. Otherwise, the request will be left hanging.

Note --> The next() function could be named anything, but by
convention it is always named "next". To avoid confusion,
always use this convention.


        --- Middleware function validateCookies ---

async function cookiesValidator (cookies) {
    try{
    await externallyValidatorCookiees(cookies.testCookies);
    }catch {
        throw new Error('Invalid cookies');
    }
 }

Here, we use the cookie-parser middleware to parse incoming
cookies off the req object and pass them to our cookiesValidator
function. The validateCookies middleware returns a Promise that
upon rejection will automatically trigger our error handler.

const express = require('express');
const cookieParser = require(cookie-parser);
const cookieValidator = require('./cookieValidator');

const app = expres();

async function validateCookies (res, req, next) {
    await cookiesValidator(req.cookies);
    next();
}

app.use(cookieParser());

app.use(validateCookies);

app.use((err, req, res, next) => {
    res.status(400).send(err.message);

})

app.listen(3000);


*/
/////////////////////////////////////////
// const myLogger = function (req: Request, res: Response, next: NextFunction) {
//     console.log("LOGGED");
//     next();
// }
// app.use(myLogger);
// app.get('/', (req: Request, res: Response) => {
//     res.send("Hello world !!!");
// })
// interface coustomRequest extends Request {
//     requestTime?: number;
// }
// const requestTime = function (req: coustomRequest, res: Response, next: NextFunction) {
//     req.requestTime = Date.now();
//     next();
// }
// app.use(requestTime);
// app.get('/', (req: coustomRequest, res: Response) => {
//     let responseText = 'Hello World <br>';
//     responseText += `<small>Request at: ${req.requestTime}</small>`;
//     res.send(responseText);
// })
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
app.use((err, req, res, next) => {
    res.status(400).send(err.message);
});
app.listen(PORT, () => {
    console.log(`Server is listening on the port ${PORT}`);
});
