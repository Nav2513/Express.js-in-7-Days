import express, {Response, NextFunction } from 'express';

const router = express.Router();

const timelog = (next: NextFunction) => {
    console.log('Time', Date.now());
    next();
}

router.use(timelog);

router.get('/', (res: Response) => {
    res.send("Home page !!!!");
})

router.get('/birds', (res: Response) => {
    res.send("This is the bird page !!!");
})


module.exports = router;


