const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup =  (req, res, next) =>{
    console.log("req.bodyreq.body",req.body);
    User.find({email: req.body.email}).exec().then(user => {
        if (user.length >= 1) {
            console.log("user",user);
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
                        password: hash
                    });
                    user.save().then(result => {
                            res.status(201).json({
                                message: "User created",
                                result: result
                            })
                        }
                    )
                        .catch(err => {
                                console.log(err)
                                res.status(500).json({
                                    error: err
                                })
                            }
                        );
                }
            })
        }

    })
}

exports.login = (req,res,next) =>{
    User.find({email: req.body.email})
        .exec()
        .then(user => {
            console.log("user",user);
            if (user.length < 1) {
                return res.status(404).json({
                    message: 'Auth failed1'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed2'
                    })
                }
                if (result) {
                    const token = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        }, "secret", {
                            expiresIn: "7d"
                        }
                    )
                    const expireTokenDuration = 60 * 60 * 24  * 30;
                    console.log("expireTokenDuration",expireTokenDuration);
                    const now =  new Date();
                    const expiredAt = new Date(now.getTime() + (expireTokenDuration * 1000));
                    console.log("expiredAt",expiredAt);
                    return res.status(200).json({
                        message: 'Auth success',
                        userId: user[0]._id,
                        token: token,
                        expiredAt: expiredAt
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
            }
        );
}
