var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.homePage = function (request, response) {
    response.send("Hello!");
};

exports.setup = function (request, response) {
    var nick = new User({
        name: "Nick Boss",
        password: "PassWord1010",
        admin: true
    });

    nick.save(function (err,nickR) {
        if (err) {
            throw new Error(err);
        }
        console.log("User Save Successfully");
        response.json({
            success: true
        });
    });
};