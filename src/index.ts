const express =  require('express');
const birds = require('./experimental/birds');

const app = express();
const PORT = 3001;

app.use('/', birds);

app.listen(PORT, () => {
    console.log(`Server is listening on the post ${PORT}`);
});


