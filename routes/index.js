var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var user = require('../models/users');
var sessionID;
router.use(function(req, res, next){
    console.log(req.session);
    console.log(req.sessionID);
    console.log(sessionID);
    if(req.session.view)
    {
        req.session.view++;
    }
    else
    {
        req.session.view = 0;
    }
    console.log('req.sessionID: ' + req.sessionID );
    console.log('sessionID: ' + sessionID);
    console.log('req.sessionID == sessionID: ' + (req.sessionID == sessionID));
    //If the cookie's session ID isn't the same as the old one, log out!
    if(sessionID && !(req.sessionID === sessionID))
    {
        req.session.loggedIn = false;
        res.send('Heck you heckin\' hacker!');
    }
    else if(!sessionID)
    {
        req.session.loggedIn = false;
        next();
    }
    else
    {
        //If the cookie's session ID is the same as the old one, the session is secure
        //so rotate the session ID to become a new one and set sessionID
        var oldSession = req.session;
        req.session.regenerate(function(err){
            req.session.email = oldSession.email;
            req.session.view = oldSession.view;
            req.session.loggedIn = oldSession.loggedIn;
            //Save current session ID to compare
            if(!err)
            {
                //Copy old session values to the new session
                sessionID = req.sessionID;
                next();
            }
        });
    }
});
router.get('/', function(req, res, next) {
    var email = 'mail@mail.com';
    var id = 'ID';
    if(req.session.color == undefined)
        req.session.color = 0;
    req.session.view++;
    req.session.test = 'test';
    if(!(req.session.email == undefined))
    {
        email = req.session.email;
    }
    console.log("Email is: " + email);
    if(req.sessionID)
    {
        id = req.sessionID;
    }
    res.render('index', { email: email, title: 'Express' , id: req.sessionID, color: req.session.color, loggedIn: req.session.loggedIn});
    console.log(req.session.email);
    console.log(req.session.view);
});

/* GET home page. */
router.get('/home', function(req, res, next){
    if(req.session.color == undefined)
        req.session.color = 0;
    req.session.view++;
    var email = 'mail@mail.com';
    var password = 'p4ssw0rd';
    var id = 'ID';
    if(!(req.session.email == undefined))
    {
        email = req.session.email;
    }
    if(req.session.password)
    {
        password = req.session.password;
    }
    if(req.sessionID)
    {
        id = req.sessionID;
    }
    console.log(req.session.email);
    res.render('home', { email: email, title: 'Express' , id: req.sessionID, color: req.session.color, loggedIn: req.session.loggedIn});
});
/* GET login page. */
router.get('/login', function(req, res, next) {
    req.session = req.session;
    var email = 'mail@mail.com';
    var id = 'ID';
    if(req.session.color == undefined)
        req.session.color = 0;
    req.session.view++;
    console.log(req.session.view);
    if(!(req.session.email == undefined))
    {
        email = req.session.email;
    }
    if(req.sessionID)
    {
        id = req.sessionID;
    }
    console.log(req.session.email);
    res.render('login', { email: email, title: 'Express' , id: req.sessionID, color: req.session.color, loggedIn: req.session.loggedIn});
});

/* POST login page. */
router.post('/login', function(req, res) {
    //this is the object that contains the form's email and password fields
    if(req.session.color == undefined)
        req.session.color = 0;
    req.session.view++;
    console.log(req.session.test);
    var post = req.body;
    console.log("posting...");
    console.log(req.session.view);
    //Query to see if the username and password exist in the system
    user.findOne({username : post.email, password :post.password }, function(err, entry){
        req.session.email = post.email;
        req.session.password = post.password;
        sessionID = req.sessionID;
        console.log(post);
        if(entry)
        {
            req.session.loggedIn = true;
            console.log(req.session.id);
            res.send("You logged in");
            console.log("Email: %s\tPassword:%s", entry.username, entry.password); 
        }
        else
        {
            req.session.loggedIn = false;
            console.log(err);
            res.send('Couldn\'t login.');
        }
    });
});
/* GET color page. */
router.get('/color', function(req, res, next) {
    if(req.session.color == undefined)
        req.session.color = 0;
    req.session.view++;
    console.log(req.session);
    console.log(req.sessionID);
    console.log(req.session.view);
    res.render('color', { title: 'Login' , color: req.session.color});
});

/* POST login page. */
router.post('/color', function(req, res) {
    req.session.color = req.body.color;
    res.render('color', { title: 'Color', color: req.session.color});
});

module.exports = router;
