const express = require('express');
const PORT = 5008;
const app = express();
const getRoutes = require('./routes');
const mongoose = require('./helpers/db-config');

const API_VERSION = '/v1';
const API_PREFIX = '/api' + API_VERSION;


app.use(express.urlencoded({ extended: true }));
let routes = getRoutes.get(express.Router());
app.use(API_PREFIX, routes);

mongoose(function () {
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
});



// Answers
// basic salary:  1938125
// overtime:     275461.875
// bonus:        10483.55
// total salary: 2224070.425