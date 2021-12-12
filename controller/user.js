const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    console.log("req.bodyreq.body", req.body);
    User.find({ email: req.body.email }).exec().then(user => {
        if (user.length >= 1) {
            console.log("user", user);
            return res.status(409).json({
                message: 'Mail exists'
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    })
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        email: req.body.email,
                        full_name: req.body.full_name,
                        permission: req.body.permission,
                        is_active: req.body.is_active,
                        address: req.body.address,
                        password: hash
                    });
                    user.save().then(result => {
                            res.status(201).json({
                                message: "User created",
                                result: result
                            })
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(500).json({
                                error: err
                            })
                        });
                }
            })
        }

    })
}

exports.login = (req, res, next) => {
    console.log(req);
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(404).json({
                    message: 'cannot user '
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    })
                }
                if (result) {
                    // const expireTokenDuration = 60 * 60 * 24 * 30;
                    // const now = new Date();
                    // const expiredAt = new Date(now.getTime() + (expireTokenDuration * 10));
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id,
                    }, "secret", {
                        expiresIn: "7d"
                    })
                    return res.status(200).json({
                        message: 'Auth success',
                        token: token,
                    })
                }
                res.status(401).json({
                    message: 'Auth failed3'
                })
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        });
}