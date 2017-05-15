const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const router = require('./router');

//DB
mongoose.connect('mongodb://localhost:auth/auth');

//App Set up
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));
router(app);

//Server start up
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Servver is listening on: ', port);