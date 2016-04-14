var express = require('express');
var mongoose = require('mongoose');
var user = require('../models/users');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var users = user.find({},function(err, docs){
    console.log(err);
    res.send(docs);
  });
});

router.post('/', function(req, res, next) {
  res.send('respond with a resource');
});
module.exports = router;
