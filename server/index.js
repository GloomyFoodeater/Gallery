require('dotenv').config();

const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const auth = require('./middleware/auth');
const errorHandler = require("./middleware/errorHandler");

const imagesRouter = require('./routes/imagesRouter');
const albumsRouter = require('./routes/albumsRouter');
const sessionRouter = require('./routes/sessionRouter');
const usersRouter = require('./routes/usersRouter');

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({credentials: true, origin: true, optionsSuccessStatus: 200,}));

app.use('/images', auth, imagesRouter);
app.use('/albums', auth, albumsRouter);
app.use('/session', sessionRouter);
app.use('/users', usersRouter);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`[listen] on port ${process.env.PORT}`);
});

