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
    console.log("posting...");
    user.findOne({username : post.email, password :post.password }, function(err, entry){
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
