"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const timelog = (next) => {
    console.log('Time', Date.now());
    next();
};
router.use(timelog);
router.get('/', (res) => {
    res.send("Home page !!!!");
});
router.get('/birds', (res) => {
    res.send("This is the bird page !!!");
});
module.exports = router;
