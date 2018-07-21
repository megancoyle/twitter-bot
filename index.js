require("dotenv").config();
var Twit = require("twit");
var T = new Twit({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});
var users = ["MuseumModernArt", "hirshhorn", "ngadc"];
var stream = T.stream("statuses/filter", { follow: users });
stream.on("tweet", function(tweet) {
  if (users.indexOf(tweet.user.id_str) > -1) {
    console.log(tweet.user.name + ": " + tweet.text);
    T.post("statuses/retweet/:id", { id: tweet.id_str }, function(
      err,
      data,
      response
    ) {
      console.log(data);
    });
  }
});
