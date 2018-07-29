# Twitter-bot

## Overview

Twitter-bot is a bot I made to help streamline my marketing for [my artwork](https://megancoyle.com/). The bot retweets tweets from a list of users, and can also retweet tweets from specific hashtags.

## Technologies Used

- [Node.js](https://nodejs.org/en/)
- [twit](https://github.com/ttezel/twit): Twitter API client for Node.js
- [Heroku](http://heroku.com/): platform for deployed applications

## Approach

I knew that I wanted to build something that could make my life easier. I feel like I've spent too many hours trying to create a social media marketing strategy, when I really should focus more energy and effort creating better artwork. Thus I decided to explore building bots to automate my social media marketing.

I started off by creating a function for my bot to retweet tweets with a specific hashtag. Then I created a function to retweet tweets from a list of users. I identified the users by their Twitter ids, since users always have the ability to change their screen names (this is also why I included comments with info on what accounts are associated with the different ids)

In order to allow the bot to work automatically, I deployed it to Heroku.

### User Stories

- As a user, I want a bot that can retweet tweets from specific Twitter users.
- As a user, I want a bot that won't retweet tweets it has already tweeted.
- As a user, I want a bot that can retweet tweets tagged with specific hashtags.
- As a user, I want a bot that will retweet once a day, around the same time of day.

## Installation

After cloning down the repo, make sure to create a `.env` file, and populate it with your own Twitter keys (use `.env.example` as a template. You should also run `npm init` to install all related packages.

## Unsolved Problems/Next Steps

- Build out the list of users to tweet
- Create a better formula for filtering through users to retweet
- Build out the logic behind retweeting tweets associated with specific hashtags
