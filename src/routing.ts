import express, {Request, Response} from 'express';

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
*/


const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send("Basic Route");
})


app.listen(PORT, () => {
    console.log(`Server is listening on the port ${PORT}`)
})