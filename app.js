const express = require("express")
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const Routes = require('./Routes');

class kernel {
    app = {};
    apiVersion = '';
    mongoose = {};
    constructor() {
        this.app = app
        this.apiVersion = "/v1";
        this.mongoose = mongoose;
        this.allowHeader();
        this.runDB();
        this.runApiApp();
    }
    allowHeader() {
        this.app = app;
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
            res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
            res.header(
                "Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept"
            );
            next();
        });
    }
    runApiApp() {
        const router = new Routes();
        router.runApi(this.app, this.apiVersion);
    }
    runDB() {
        this.mongoose.set('useNewUrlParser', true);
        this.mongoose.set('useFindAndModify', false);
        this.mongoose.set('useCreateIndex', true);
        this.mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log("MongoDb connected"))
            .catch(err => console.log(err));
    }
}
mongoose.Promise = global.Promise;
const kernels = new kernel();
module.exports = kernels.app;