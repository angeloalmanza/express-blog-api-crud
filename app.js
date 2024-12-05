const express = require('express');
const app = express();
const port = 3000;
const postRouter = require('./routers/posts');

app.use(express.static('public'));

app.use(express.json());

app.use("/posts", postRouter);

app.get('/', (req, res) => {
    res.json('Server del mio blog');
})

app.listen(port, () => {
    console.log('Server is listening');
})