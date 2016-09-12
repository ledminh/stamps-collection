module.exports = function(express, app, passport, data) {
  //SERVE STATIC FILES
  app.use(express.static('public'));

  //=====================
  // FACEBOOK routes
  // ====================
  app.get('/facebook-login', passport.authenticate('facebook'));

  app.get('/facebook-callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/'
  }));

  app.get('/user-info-request', (req, res) => {
    if(req.user){
        data.user.findOne({facebookID: req.user.facebookID}, (err, user) => {
            if(err){
              throw err;
            }

            data.stamper.findOne({userID: user._id}, (err, stampData) => {
              if(err)
                throw err;

              //If data for this user does not exist yet
              if(!stampData){
                //Create new stamp
                var newStampData = new data.stamper({
                  userID: user._id,

                  score: 0,

                  basket: {
                    current_id: 0,
                    counter: 0
                  },

                  stamps: {
                    current_id: 0,
                    last_position: {
                      left: -1,
                      top: -1
                    },
                    numStamps: 0
                  }
                });

                //Save it
                newStampData.save();


                //Send info to client
                return res.send({
                  name: req.user.name,
                  photo_url: req.user.photo,
                  stamps: newStampData.stamps,
                  score: newStampData.score,
                  basket: newStampData.basket
                });
              }

              //If data for this user exists
              res.send({
                name: req.user.name,
                photo_url: req.user.photo,
                stamps: stampData.stamps,
                score: stampData.score,
                basket: stampData.basket
              });
            })
        });

    }
    else{
      res.send(null);
    }

  });

  //=====================
  // LOG OUT
  // ====================
  app.post("/logout", (req, res) => {
    if(req.user){
      data.user.findOne({facebookID: req.user.facebookID}, (err, user) => {
          if(err)
            throw err;

          if(user){
              data.stamper.findOne({userID: user._id}, (err, stamperData) => {
              stamperData.score = req.body.score;
              stamperData.basket = req.body.basket;
              stamperData.stamps = req.body.stamps;


              stamperData.save();
            });
          }


          req.logout();

          res.send({success: true});

      });

    }
    else{
      res.send({success: false});
    }
  });

  //=====================
  // SAVE
  // ====================
  app.post("/save", (req, res) => {
    if(req.user){
      data.user.findOne({facebookID: req.user.facebookID}, (err, user) => {
        if(err)
          throw err;

        if(user){
          data.stamper.findOne({userID: user._id}, (err, stamperData) => {
            stamperData.score = req.body.score;
            stamperData.basket = req.body.basket;
            stamperData.stamps = req.body.stamps;

            stamperData.save();
          });
        }


      });
    }
  });
}
