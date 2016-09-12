var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = (passport, data) => {

  var callbackFunction = (accessToken, refreshToken, profile, done) => {
      data.user.findOne({facebookID: profile.id}, (err, user) => {
        if(err)
          return done(err);

        if(!user){
            var newUser = new data.user({
              facebookID: profile.id
            });

            newUser.save();
        }

        done(null, {
          facebookID: profile.id,
          name: profile.displayName,
          photo: profile.photos[0].value
        });

      });

  };

  var thisStrategy = new FacebookStrategy({
      clientID: "306021803092793",
      clientSecret: "8956eba61b3a32034cc4065a72424022",
      callbackURL: "/facebook-callback",
      profileFields: ['id', 'displayName', 'picture.type(large)']
  }, callbackFunction);


  passport.use(thisStrategy);

  passport.serializeUser((user, done) => {
      done(null, user);
  });

  passport.deserializeUser((user, done) => {
      done(null, user);
  })
}
