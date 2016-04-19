var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var user = require('../models/users');
var sess;
/* GET login page. */
router.get('/', function(req, res, next) {
  sess = req.session;
  sess.test = 'test';
  console.log(sess.test);
  req.session.method = 'Login GET';
  res.render('login', { title: 'Login' });
});

/* POST login page. */
router.post('/', function(req, res) {
    //this is the object that contains the form's email and password fields
    console.log(sess.id);
    sess = req.session;
    console.log(sess.test);
    var post = req.body;
    console.log("posting...");
    req.session.method = 'Login POST';
    //Query to see if the username and password exist in the system
    user.findOne({username : post.email, password :post.password }, function(err, entry){
        console.log(post);
        if(entry)
        {
            res.send("You logged in");
            sess.id = genuuid();
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
