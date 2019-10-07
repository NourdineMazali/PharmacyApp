const Pharmacy = require('../models/pharmacy.model.js');
const session = require('express-session');

exports.login = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    Pharmacy.authenticate(email, password, function (error, user) {
        if (error || !user) {
            res.status(404).send({
                message: "Wrong email or password"
            });
        } else {
            //Login
            req.session.userId = user._id;

            res.send({
                message : 'Authenticated'
            });}
    });
};

exports.logout = (req, res) => {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
};

exports.isLoggedIn = (req, res) => {
    if (req.session && req.session.userId) {
        res.status(200).send({
            message: `Authenticated`
        });
    }else {
        res.status(401).send({
            message: `unAuthenticated`
        });
    }
};