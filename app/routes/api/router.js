var apiRoutes = require('express').Router();
var User = require('../../models/User');
var jwt = require('jsonwebtoken');


apiRoutes.post('/authenticate', function (req, res) {
    User.findOne({
        name: req.body.name
    }, function (err, user) {
        if (err) {
            throw err;
        }
        if (!user) {
            res.json({
                success: false,
                message: "Authentication failed! User not found."
            });
        } else if (user) {
            if (user.password != req.body.password) {
                res.json({
                    success: false,
                    message: "Authentication failed! Wrong password."
                });
            } else {
                const payload = {
                    admin: user.admin
                };
                var token = jwt.sign(payload, req.app.get('superSecret'), {
                    expiresIn: 1440
                });
                res.json({
                    success: true,
                    message: "Enjoy your token",
                    token: token
                });
            }
        }
    })
});


apiRoutes.use(function (req, res, next) {
    var token=req.body.token || req.query.token || req.headers['x-access-token'];

    if(token){
        jwt.verify(token,req.app.get('superSecret'),function(err,decoded){
            if(err){
                return res.json({
                    success: false,
                    message: "Failed to authenticate token."
                });
            }else{
                req.decoded=decoded;
                next();
            }
        });
    }else{
        return res.status(403).send({
            success: false,
            message: "No token provided"
        });
    }
});


apiRoutes.get('/', function (req, res) {
    res.json({
        message: "Welcome to api"
    });
});


apiRoutes.get("/users", function (req, res) {
    User.find({

    }, function (err, users) {
        res.json(users);
    });
});


module.exports = apiRoutes;