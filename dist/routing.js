"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
/*
       -- Routing --

Routing refers to how an application's endpoints (URIs) respond to client requests.

You define routing using methods of the Express app object that
correspond to HTTP methods — for example, `app.get()` to handle GET
requests and `app.post()` to handle POST requests. You can also use
`app.all()` to handle all HTTP methods and `app.use()` to specify
middleware as the callback function.

These routing methods specify a callback function (sometimes called a "handler function") that is called when the application receives a request matching a specific route (endpoint) and HTTP method. In other words, the application "listens" for requests and invokes the appropriate callback when there's a match.

In fact, routing methods can have more than one callback function as arguments. When using multiple callbacks, it's important to provide `next` as an argument and call `next()` to pass control to the next function in the stack.

        -- Route Paths --

Route paths, in combination with a request mehtod, define the endpoints at which request can made. Route paths can cbe strings,
string patterns, or regular expressions.


Note -->
In Express 5, the charater ?, +, *, [], and () are handled
differently than in version 4,

Note --> In Express 4, regular expression character such as $ need
to escaped with a \.

Note --> Express uses path-to-regexp for matching the route paths;
see the path-to-regexp documentation for all the possibilities in
defning route paths. Express Playground Router is a handy tool for
testing basuc Express routes, although it does not support pattern
matching.

Note --> The String pattern in Express 5, no longer work. You can also refer to the migration file.


        -- Route Parameters --

Routes parameters are named URL segments that are used to capture
the values specified at thier position in the URL. The captures
values are populated in the req.params object, with the name of the
route parameter specified in the path as their respective keys.

Route path: /users/:userId/books/:bookId
Request URL: http://localhost:3000/users/34/books/8989
req.params: { "userId": "34", "bookId": "8989" }


*/
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
//      --- Basic Routing ---
// This route path will match request to the root route, /.
app.get('/', (req, res) => {
    res.send("Basic Route");
});
app.post('/', (req, res) => {
    res.send("POST request to the homepage");
});
// This route path will match request to /secret.
app.all('/secret', (req, res, next) => {
    console.log("Accessin the secret section...");
    res.send("Secret section accessed");
    next();
});
// This route path will match request to /random.text.
app.get("/random.text", (req, res) => {
    res.send('Random.text');
});
//      --- Route Parameter ---
app.get('/user/:userId/books/:bookId', (req, res) => {
    console.log("Route Parameter");
    res.send(req.params);
});
app.listen(PORT, () => {
    console.log(`Server is listening on the port ${PORT}`);
});
