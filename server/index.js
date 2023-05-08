require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const imagesRouter = require('./routes/imagesRouter');
const albumsRouter = require('./routes/albumsRouter');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/images', imagesRouter);
app.use('/albums', albumsRouter);

app.listen(process.env.PORT, () => {
    console.log(`[listen] on port ${process.env.PORT}`);
});

