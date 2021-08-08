const express = require("express")
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const userRoutes = require('./api/user')
require('dotenv').config();
const mainRoutes = require('./api/main');
const app = express();
const morgan = require('morgan');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect('mongodb+srv://duythinh:716284@cluster0.dovxc.mongodb.net/todolist?retryWrites=true&w=majority')
    .then(() => console.log("MongoDb connected"))
    .catch(err => console.log(err));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json())
app.use("/v1/user",userRoutes);
app.use("/v1/main",mainRoutes);
mongoose.Promise = global.Promise;

// app.use((req, res, next) => {
//     const error = new Error('Not found');
//     error.status(404);
//     next(error);
// })
// app.use((error, req, res, next) => {
//     res.status(error.status || 500);
//     res.json({
//         error: {
//             message: error.message
//         }
//     })
// })

module.exports = app;
