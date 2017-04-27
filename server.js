// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                        // create our app w/ express
    var mongoose = require('mongoose');              // mongoose for mongodb
    var morgan   = require('morgan');                // log requests to the console (express4)
    var bodyParser = require('body-parser');         // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var database = require('./config/database');
    var port     = process.env.PORT || 8888;
    var path = require('path');
 
    var passport = require('passport');
    var cookieParser = require('cookie-parser');
   
        
    mongoose.Promise = Promise;  
    //app.set('views', path.join(__dirname, 'public'));
  
   
   


    // configuration ===============================================================
    mongoose.connect(database.url);     // connect to mongoDB database on modulus.io
   

             require('./app/passport')(passport);
    app.use(express.static(__dirname + '/public'));       
    
   
              // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json()); 
      // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());
    

    app.post('/api/loadSheet',function(req, res, next){
      //var express = require('express');
      var router = express.Router();
      var jsonfile = require('jsonfile');
      var file = 'data.json';
      /* GET home page. */
      var name = req.body.name;
      console.log(name);
      module.exports = router;
      let google = require('googleapis');
      let authentication = require("./authentication");
      function getData(auth) {
        var sheets = google.sheets('v4');
        sheets.spreadsheets.values.get({
          auth: auth,
          spreadsheetId: '1MLXEdZ-meQ2mMFwSH4JfBPqCq8ETu3QPydnEAsNATqM',
          range: name, //Change Sheet1 if your worksheet's name is something else
          }, (err, response) => {
                if (err) {
                  console.log('The API returned an error: ' + err);
                  return;
                  } 
              var rows = response.values;
              return res.json(rows);
             //console.log(rows);
              jsonfile.writeFile(file, rows, function (err) {
                console.error(err);
                })
              if (rows.length === 0) {
                console.log('No data found.');
                } else {
                  /* for (var i = 0; i < rows.length; i++) {
                  var row = rows[i];
                  console.log(row.join(", "));
                  }*/
                }
              });
            }
            authentication.authenticate().then((auth)=>{
            getData(auth);
          });
    });
    
    app.get('/api/getSheetNames', function(req, res){
      var request = require("request");
      let google = require('googleapis');
      let authentication = require("./authentication");
      var sheets = google.sheets('v4');
      var spreadsheetId = '1MLXEdZ-meQ2mMFwSH4JfBPqCq8ETu3QPydnEAsNATqM';
      authentication.authenticate();
      request({
        uri : "https://sheets.googleapis.com/v4/spreadsheets/1MLXEdZ-meQ2mMFwSH4JfBPqCq8ETu3QPydnEAsNATqM?&fields=sheets.properties",
        method : "GET",
        headers : {
          'api-key' :'AIzaSyAOjQ9RYraV6mnf2L7F0OzDkMRTbacvT0c'
        },
        timeout : 10000,
        followRedirect : true,
        maxRedirects : 10
      }, function(erroe, response, body){
        console.log(body);
      });
    });

    var expressSession = require('express-session');
    app.use(cookieParser());
    // TODO - Why Do we need this key ?
    app.use(expressSession({secret: 'mySecretKey'}));
    app.use(passport.initialize());
    app.use(passport.session());
    // routes ======================================================================
    require('./app/routes.js')(app,passport);
    // listen (start app with node server.js) ======================================
    app.listen(port);
    console.log("App listening on port : " + port);


