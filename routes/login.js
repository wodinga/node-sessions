var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var user = require('../models/users');
/* GET login page. */
router.get('/', function(req, res, next) {
  console.log('get');
  res.render('login', { title: 'Login' });
});

router.post('/', function(req, res) {
    var post = req.body;
    //console.log(post);
    console.log("posting...");
    if (user.findOne({ 'email': post.email, 'password': post.password}), function(err, entry){
        console.log(entry); 
    })
    {
        res.send('You logged in');
    }
    else
    {
        res.send('Couldn\'t login.');
    }
});
module.exports = router;
