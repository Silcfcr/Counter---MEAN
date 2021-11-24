// Load the express module (Where do you think this comes from?)
var express = require("express");
// step 1 of 2 to use session
var session = require('express-session');
// invoke var express and store the resulting application in var app
var app = express();
// step 2 of 2 for session
app.use(session({ secret: 'codingdojorocks' }));
// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views');
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
app.set('view engine', 'ejs');

// app.get("/cat1", function (request, response){
//     // hard-coded user data
//     var cat = {
//         name: "Cuddles",
//         age: 3,
//         favorite_food: "spaguetti",
//         sleeping_spots: ["under the bed", "in a sunbeam", "above the fridge"]
//     };
//     response.render('details', {cat: cat});
// })

// app.get("/cat2", function (request, response){
//     // hard-coded user data
//     var cat = {
//         name: "Max",
//         age: 2,
//         favorite_food: "Meatballs",
//         sleeping_spots: ["in the bed", "outside", "sofa"]
//     };
//     response.render('details', {cat: cat})
// })

// app.get("/cat2", function (request, response){
//     // hard-coded user data
//     var users_array = [
//         {name: "Michael", email: "michael@codingdojo.com"}, 
//         {name: "Jay", email: "jay@codingdojo.com"}, 
//         {name: "Brendan", email: "brendan@codingdojo.com"}, 
//         {name: "Andrew", email: "andrew@codingdojo.com"}
//     ];
//     response.render('users', {users: users_array});
// })

app.get("/cats", function (request, response) {
    response.render('cats');
})


// root route
app.get('/', function (req, res) {
    // set the name property of session. 
    // req.session.name = req.body.name;
    console.log(req.session.counter);
    if (!req.session.counter && req.session.counter != "undefined") {
        req.session.counter = 0;
        console.log("I'm here 1")
    } else {
        req.session.counter += 1;
        console.log("I'm here 2")
    }
    let counter = req.session.counter;
    res.render('index', { counter: counter });
    //code to add user to db goes here!
    // redirect the user back to the root route. 
    // res.redirect('/');
});

app.get( '/addTwo', function( request, response ){
    request.session.counter += 1;
    response.redirect( '/' );
});

app.get( '/reset', function( request, response ){
    request.session.counter = 0; 
    response.redirect( '/' );
});


// this is the line that tells our server to use the "/static" folder for static content
app.use(express.static(__dirname + "/static"));
console.log(__dirname);
// two underscores before dirname
// try printing out __dirname using console.log to see what it is and why we use it

// Tell the express app to listen on port 8000
app.listen(8000, function () {
    console.log("listening on port 8000");
})
  // this line will almost always be at the end of your server.js file (we only tell the server to listen after we have set up all of our rules)
