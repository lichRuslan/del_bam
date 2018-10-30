'use strict';

var express = require('express'),
    exphbs  = require('express-handlebars'),
    redis   = require('redis'),
    client  = redis.createClient(6379, 'redis'), 
    path    = require('path'),
    app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({extname:'hbs', defaultLayout:'main.hbs'}));
app.set('view engine', 'hbs');

app.get('/', function (req, res) {
  
  client.setnx('counter', 0);
  client.get("counter", function(err, counter) {
    if (counter != null)
    {
      client.incr('counter');
      res.render('home', {visitor_counter: counter});
    }
    else
    {
      console.log(err);
    }
  });

});

app.listen(3000, function () {
    console.log('server listening on: 3000');
});
