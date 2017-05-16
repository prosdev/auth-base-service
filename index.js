const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const router = require('./router');
const config = require('./config');
const cors = require('cors');

const mongoURL = 'mongodb://' + config.mongoUsername + ':'+ config.mongoPassword + '@ds143131.mlab.com:43131/prosdevlab-service';
//DB
mongoose.connect(mongoURL);

//App Set up
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));
router(app);

//Server start up
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Servver is listening on: ', port);