"use strict";


// INITIALIZATION
const express = require('express');
const morgan = require('morgan');
const config = require('./config');

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(morgan('tiny'));

// MONGODB & MONGOOSE SETUP
const mongoose = require('mongoose');
mongoose.Promise = Promise;
//mongoose.connect(config.localMongoDB + '/jokeDB', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect('mongodb+srv://Pains:PainsDB@cluster0-fylfn.gcp.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

// ROUTES FOR THE APP
const jokeRouter = require("./routes/joke");
app.use('/api/jokes', jokeRouter);

const othersitesRouter = require("./routes/othersites");
app.use('/api/othersites', othersitesRouter);

// START THE SERVER
const port = process.env.PORT || config.localPort;
app.listen(port);
console.log('Listening on port ' + port + ' ...');

module.exports = app; // pga. test