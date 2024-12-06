const express = require('express');
const app = express();
const port = 3000;
const postRouter = require('./routers/posts');
const handleError = require('./middleware/handleError');

app.use(express.static('public'));

app.use(express.json());

app.use("/posts", postRouter);

app.get('/', (req, res) => {
    res.json('Server del mio blog');
})

app.use(handleError);

app.listen(port, () => {
    console.log('Server is listening');
})