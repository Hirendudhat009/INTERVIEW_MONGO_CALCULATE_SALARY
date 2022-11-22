const mongoose = require('mongoose');
const models = require('../models/index');
const mongoUriBuilder = require('mongo-uri-builder');
const config = require("../config/env.json")

const defaultOptions = {
    useMongoClient: true,
    native_parser: true,
    auth: {
        user: 'admin',
        password: 'root'
    },
    readPreference: 'primaryPreferred',
    autoReconnect: true,
    poolSize: 8,
    keepAlive: 500,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}


let options = config.mongo.options || defaultOptions;
let connection_string = getConnStr(config.mongo, options);

module.exports = function initConnection(callback) {
    mongoose.connect(connection_string);
    var demo = mongoose.connection;
    demo.on('error', function(err) {
        dbLogger('Failed to connect to database');
        dbLogger(err);
        process.exit(1);
    });

    demo.on('connecting', function() {
        dbLogger('connecting to demo Mongo DB...');
    });
    demo.on('error', function(error) {
        console.error('error in demo mongo db connection: ' + error);
    });
    demo.on('connected', function() {
        dbLogger('demo mongo db connected!');
    });
    demo.once('open', function() {
        dbLogger('demo db connection opened.');
        models.setup(demo).then(res => {
            dbLogger('Models Set Successfully.')
            callback();
        });
    });
};

function getConnStr(mongo, opts) {
    dbLogger(`db is: ${mongo.database}`);
    dbLogger(`replicas: ${mongo.replicas}`);

    var connectionStr = mongoUriBuilder({
        username: encodeURIComponent(mongo.username),
        password: encodeURIComponent(mongo.password),
        host: mongo.replicas,
        replicas: mongo.replicaSet,
        database: mongo.database,
        options: opts
    });

    return connectionStr;
}

function dbLogger(message) {
    console.log(`${new Date().toString()} - ${message}`);
}