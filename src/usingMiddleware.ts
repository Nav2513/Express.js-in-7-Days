import express, {Request, Response, NextFunction } from 'express';

const app = express();
const PORT = 3000;
app.use(express.json());

/*
        --- Application level middleware ---

Bind application-level middleware to an instance of the 
app object by using the app.use() and app.MEHTOD() functions,
where  METHOD is the HTTP mehtod of the request that the 
middleware function handles(such as GET, PUT, or POST)
in lowercase.

This example showws a middleware function with np mount path.
the function is executed every time the app recieves a request.

const express = require('express');
const app = express = express();

app.use((req, res, next) => {
    console.log('Time', Date.now);
    next();
})

This example shows a middleware function mounted on the 
/user/:id path. the function is executed for any type of the 
HTTP request on the /user/:id path.

app.use('/user/:id', (req, res, next) => {
    console.log('Request type:', req.mehtod);
    next();
})
 
This example shows a router and its handler function
(middleware system). the function hanldes GET handle GET request
to the /user/:id path.

app.get('/user/:id', (req, res, next) => {
    res.send('User');
})

*/



app.listen(PORT, () => {
    console.log(`Server is listing on the port ${PORT}`)
})