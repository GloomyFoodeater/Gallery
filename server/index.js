require('dotenv').config();

const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require("./middleware/errorHandler");

const restApi = require('./api/rest/routes/index');
const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({credentials: true, origin: true, optionsSuccessStatus: 200}));

app.use('/api/rest', restApi);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`[listen] on port ${process.env.PORT}`);
});

