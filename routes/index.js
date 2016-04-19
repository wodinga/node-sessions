var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var user = require('../models/users');
var sess;
router.get('/', function(req, res, next) {
    sess = req.session;
    sess.view++;
    sess.test = 'test';
    console.log(sess.test);
    if(sess.email)
        res.render('index', { email: sess.email, title: 'Express' });
    else
        res.render('index', { title: 'Express' });
    sess.test = 'Express GET';
    req.session = sess;
    console.log(sess.id);
    console.log(sess.view);
});

/* GET home page. */
router.get('/home', function(req, res, next){
    sess = req.session;
    sess.view++;
    var email = 'mail@mail.com';
    var password = 'p4ssw0rd';
    var id = 'ID';
    if(sess.email)
    {
        email = sess.email;
    }
    if(sess.password)
    {
        password = sess.password;
    }
    if(sess.id)
    {
        id = sess.id;
    }
    res.render('home', {email: email, password: password, id: id});
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
        sess.password = post.password;
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
