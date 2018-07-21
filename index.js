require("dotenv").config();

const _ = require("lodash");
const twit = require("twit");
const config = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
};
const Twitter = new twit(config);

const MAX_RT_COUNT = 1;
const USERS = ["15057943", "5225991", "22009731"];

let retweetTags = async function() {
  try {
    const { data } = await Twitter.get("search/tweets", {
      q: "#art, #painting",
      result_type: "mixed",
      lang: "en"
    });

    const statuses = data.statuses.slice(0, MAX_RT_COUNT);

    // loop through the first n returned tweets
    for (const status of statuses) {
      // the post action
      const response = await Twitter.post("statuses/retweet/:id", {
        id: status.id_str
      });

      if (response) {
        console.log("Successfully retweeted");
      }
    }
  } catch (err) {
    // catch all log if the search/retweet could not be executed
    console.error("Err:", err);
  }
};

// retweetTags();
// setInterval(retweetTags, 600000);

let retweetUsers = async function() {
  try {
    const { data } = await Twitter.get("users/show", {
      user_id: _.sample(USERS)
    });

    const status = data.status;

    // make sure tweet isn't in reply to another user
    if (status.in_reply_to_status_id == null) {
      const response = await Twitter.post("statuses/retweet/:id", {
        id: status.id_str
      });

      if (response) {
        console.log("Successfully retweeted");
      }
    }
  } catch (err) {
    // catch all log if the search/retweet could not be executed
    console.error("Err:", err);
  }
};

retweetUsers();
