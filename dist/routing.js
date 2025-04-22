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

app.get('/users/:userId/books/:bookId', (req, res) => {
  res.send(req.params)
})

Note --> The name of the route parameter must be made of
"word characters" ([A-Za-z0-9]).

Since the hypen (-) and the dot (.) are interpreted literally, they
can be used aloong with route parameter for useful purposes.

Route path: /flights/:from-:to
Request URL: http://localhost:3000/flights/LAX-SFO
req.params: { "from": "LAX", "to": "SFO" }

Route path: /plantae/:genus.:species
Request URL: http://localhost:3000/plantae/Prunus.persica
req.params: { "genus": "Prunus", "species": "persica" }

Note --> In Express 5, charater are not supported in the route paths,
for more information you can visit the migration guide.

To have more control over the exact string that can be matched by a
route parameter, you can append a regular expression.

Route path: /user/:userId(\d+)
Request URL: http://localhost:3000/user/42
req.params: {"userId": "42"}

Note -->  Because the regular expression is usally part if a string,
be sure to escape any \ any character an aditional blaclslash,
for example \\d+.

        ---Route handlers ---

You can provide multiple callback functions that behave like
middleware to handle a request. The only exception is that these callback might invoke next('route') to bypass the remainig route
callbacks. You can use this mechanism to impose pre-condition
on a route, then pass control to subsequent route if there's no
reason to proceed with the current route.

Route handlers can be in the form of a function, array of functions,
or combinations of both, as shown in the following examples.

A single callback function can handle a route. For Example

app.get('/example/a', (req, res) => {
  res.send('Hello from A!')
})

More than one callback function can be handled a route(make sure
you specify the next object). for example

app.get('/example/b', (req, res, next) => {
  console.log('the response will be sent by the next function ...')
  next()
}, (req, res) => {
  res.send('Hello from B!')
})

        ---Response mehtod ---

The method on the response object(res) in the following table can
response to the client, and terminate the request-response cycle.
If none of these methods are called from a route handler,
the client request will be left hanging.

Mehtod              Description

res.download()	    Prompt a file to be downloaded.
res.end()	        End the response process.
res.json()	        Send a JSON response.
res.jsonp()	        Send a JSON response with JSONP support.
res.redirect()	    Redirect a request.
res.render()	    Render a view template.
res.send()	        Send a response of various types.
res.sendFile()	    Send a file as an octet stream.
res.sendStatus()	Set the response status code and send
                    its string representation as the response body.


        --- app.route() ---

You can create chainable route for a route path by using app.route().
Because th epath is specified at a signal location, creating modular
routes is helpful, as is reducing redundancy and typos.

Here is an example of chainned route hanlder that are defined by
using app.route().

app.route('/book')
  .get((req, res) => {
    res.send('Get a random book')
  })
  .post((req, res) => {
    res.send('Add a book')
  })
  .put((req, res) => {
    res.send('Update the book')
  })

        --- express.Router ---
Use the express.Router class to create modular, mountable route
handlers. A Router instanced is a complete middleware and routing system; for this reason , it is often reffered to as a
"mini-app".

The following example creates a router as a module, loads a
middleware some routes, and mounts the router module on a path
in the main app.


const express = require('express')
const router = express.Router()

// middleware that is specific to this router
const timeLog = (req, res, next) => {
  console.log('Time: ', Date.now())
  next()
}
router.use(timeLog)

// define the home page route
router.get('/', (req, res) => {
  res.send('Birds home page')
})
// define the about route
router.get('/about', (req, res) => {
  res.send('About birds')
})

module.exports = router





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
// Here appending the value of userId & bookId in the url.
app.get('/user/:userId/books/:bookId', (req, res) => {
    const { userId, bookId } = req.params;
    res.send(`userID: ${userId}, bookId: ${bookId}`);
});
// Here appending the value of from & to by using (-).
app.get('/flights/:from-:to', (req, res) => {
    const { from, to } = req.params;
    res.send(`from: ${from}, to: ${to}`);
});
// Here we are using the dot(.) to append in the url.
app.get('/plantae/:genus.:species', (req, res) => {
    const { genus, species } = req.params;
    res.send(`genus: ${genus}, species: ${species}`);
});
// Here we implement more than one callback function or middleware function 
// Request -> Middleware 1 -> Middleware 2 -> Response.
app.get('/example/b', (req, res, next) => {
    console.log("The respone will be sent by the next function ...");
    next();
}, (req, res) => {
    res.send("Hi from the second");
});
const cb0 = function (req, res, next) {
    console.log("CB0");
    const a = 10, b = 20;
    req.sum = a + b;
    next();
};
const cb1 = function (req, res, next) {
    console.log("CB1");
    next();
};
const cb2 = function (req, res) {
    console.log("CB2");
    res.send(`the sum of two number is ${req.sum}`);
};
app.get("/example/c", [cb0, cb1, cb2]);
// A combination of independent function and arrays of functions can
// handle a route.
const cd0 = function (req, res, next) {
    console.log("CD0");
    next();
};
const cd1 = function (req, res, next) {
    console.log("CD1");
    next();
};
app.get('/example/d', [cd0, cd1], (req, res, next) => {
    console.log("This response is sent by the next");
    next();
}, (req, res) => {
    res.send("Combination of the idependent function");
});
// Here we are creating the chainable route handlers using app.route.
app.route('/books')
    .get((req, res) => {
    res.send("Response from the app.route, get request");
})
    .post((req, res) => {
    res.send("Response from the app.route, post request");
})
    .put((req, res) => {
    res.send("Response from the app.route, put request");
});
//    --- express.Routes() ---
// thus code can be used in the ohter file for better 
// unde
const birds = require('./experimental/birds');
app.use('/', birds);
app.listen(PORT, () => {
    console.log(`Server is listening on the port ${PORT}`);
});
