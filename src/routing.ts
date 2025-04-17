import express, {Request, Response, NextFunction } from 'express';
import { spec } from 'node:test/reporters';

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


*/


const app = express();
const PORT = 3000;

app.use(express.json());

//      --- Basic Routing ---

// This route path will match request to the root route, /.
app.get('/', (req: Request, res: Response) => {
    res.send("Basic Route");
})

app.post('/', (req: Request, res: Response) => {
    res.send("POST request to the homepage")
})

// This route path will match request to /secret.
app.all('/secret', (req: Request, res: Response, next: NextFunction) => {
    console.log("Accessin the secret section...");
    res.send("Secret section accessed")
    next();
})

// This route path will match request to /random.text.
app.get("/random.text", (req: Request, res: Response) => {
    res.send('Random.text');
})


//      --- Route Parameter ---


// Here appending the value of userId & bookId in the url.
app.get('/user/:userId/books/:bookId', (req: Request, res:Response) => {
   const {userId, bookId} = req.params;
   res.send(`userID: ${userId}, bookId: ${bookId}`);

})

// Here appending the value of from & to by using (-).
app.get('/flights/:from-:to', (req: Request, res: Response) => {
    const {from, to} = req.params;
    res.send(`from: ${from}, to: ${to}`);
})


app.get('/plantae/:genus.:species', (req: Request, res: Response) => {
    const {genus, species} = req.params;
    res.send(`genus: ${genus}, species: ${species}`);
})


app.listen(PORT, () => {
    console.log(`Server is listening on the port ${PORT}`)
})