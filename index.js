require("dotenv").config();

const http = require("http");
const twit = require("twit");
const config = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
};
const Twitter = new twit(config);

const MAX_RT_COUNT = 1;

const USERS = [
  "15057943", // moma
  "14803372", // saam
  "5225991", // tate
  "22009731", // design museum
  "81783051", // artsy
  "158865339", // fastcodesign
  "20457080", // nga
  "21661279", // creative review
  "16336998", // print magazine
  "17623957", // design observer
  "418597196", // creativebloq
  "16517711", // whitneymuseum
  "18201801", // interior design
  "19038849" // how design
];

const getUserOfTheDay = () => {
  let date = new Date();
  let dayOfMonth = date.getDate();
  let pickUserIndex = dayOfMonth % USERS.length;

  return USERS[pickUserIndex];
};

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

let retweetUsers = async function() {
  try {
    const { data } = await Twitter.get("users/show", {
      user_id: getUserOfTheDay()
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

setInterval(function() {
  http.get("https://twitterbot-retweet.herokuapp.com/");
}, 86400000); // checks app every 24 hours
