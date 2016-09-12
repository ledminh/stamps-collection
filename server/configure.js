var session = require('express-session');
var bodyParser = require('body-parser');

module.exports = (express, app, passport, data) => {

  //Configure passport
  require('./passport')(passport, data);

  //CONFIGURE MIDDLEWARE
      //For passport
  app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());

      //Parse JSON
  app.use(require('body-parser').json());
  /*Old way
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(express.json());
  app.use(express.urlencoded()); */
}
