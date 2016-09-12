module.exports = (() => {
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost:27017/stamps');

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', () => {
    console.log("Connected Mongo at port 27017");

  });

  var userSchema = mongoose.Schema({
    facebookID: String
  });

  var stamperSchema = mongoose.Schema({
    userID: String,
    score: Number,
    basket: {},
    stamps: {}
  });

  var user = mongoose.model("user", userSchema);
  var stamper = mongoose.model('stamper', stamperSchema);

  return ({
    user,
    stamper
  });

})();
