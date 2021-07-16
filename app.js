const express = require("express")
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const morgan = require('morgan');
const userRoutes = require('./api/user')
require('dotenv').config();
const cors = require('cors');

mongoose.connect('mongodb+srv://duythinh:716284@cluster0.dovxc.mongodb.net/todolist?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("MongoDb connected"))
    .catch(err => console.log(err));

const app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json())
app.use("/users",userRoutes);
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
