const bodyParser = require("body-parser");
const morgan = require('morgan');
const mainRoutes = require('./api/main');
const mainDetailRoutes = require('./api/maindetail');
const userRoutes = require('./api/user')
const productRoutes = require('./api/products');
const optionRoutes = require('./api/option');

class Routers {
    apiVersion;
    app;
    constructor() {

    }
    getApiVersion() {
        return this.apiVersion;
    }
    setApiVersion(apiVersion) {
        this.apiVersion = apiVersion;
    }
    setApp(app) {
        this.app = app;
    }
    runApi(app, apiVersion) {
        app.use(morgan('dev'))
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(`${apiVersion}/user`, userRoutes);
        app.use(`${apiVersion}/main`, mainRoutes);
        app.use(`${apiVersion}/mainDetail`, mainDetailRoutes)
        app.use(`${apiVersion}/products`, productRoutes)
        app.use(`${apiVersion}/option`, optionRoutes)
    }
}

module.exports = Routers;