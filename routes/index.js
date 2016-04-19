var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var user = require('../models/users');
var sess;
/* GET home page. */
router.get('/', function(req, res, next) {
    sess = req.session;
    sess.view++;
    sess.test = 'test';
    console.log(sess.test);
    res.render('index', { title: 'Express' });
    sess.test = 'Express GET';
    req.session = sess;
    console.log(sess.id);
    console.log(sess.view);
});

/* GET login page. */
router.get('/login', function(req, res, next) {
    sess = req.session;
    sess.view++;
    console.log(req.session);
    console.log(sess.id);
    req.session.method = 'Login GET';
    console.log(sess.view);
    res.render('login', { title: 'Login' });
});

/* POST login page. */
router.post('/login', function(req, res) {
    //this is the object that contains the form's email and password fields
    sess = req.session;
    sess.view++;
    console.log(sess.test);
    var post = req.body;
    console.log("posting...");
    req.session.method = 'Login POST';
    console.log(sess.view);
    //Query to see if the username and password exist in the system
    user.findOne({username : post.email, password :post.password }, function(err, entry){
        sess.email = post.email;
        //console.log(sess.id);
        //sess.regenerate();
        //console.log(sess.id);
        console.log(post);
        if(entry)
        {
            res.send("You logged in");
            console.log("Email: %s\tPassword:%s", entry.username, entry.password); 
        }
        else
        {
            console.log(err);
            res.send('Couldn\'t login.');
        }
    });

});

module.exports = router;
