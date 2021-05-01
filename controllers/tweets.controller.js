const { getTweets, getTweet, createTweet, updateTweet, deleteTweet} = require('../queries/tweets.queries');

exports.tweetList = async (req, res, next) => {
  try {
    const tweets = await getTweets();
    res.render('tweets/tweet', { tweets });
  } catch(e) {
    next(e);
  }
}

exports.tweetNew = (req, res, next) => {
  res.render('tweets/tweet-form', { tweet: {} });
}

exports.tweetCreate = async (req, res, next) => {
  try {
    const body = req.body;
    await createTweet(body);
    res.redirect('/tweets');
  } catch(e) {
    const errors = Object.keys(e.errors).map( key => e.errors[key].message);
    res.status(400).render('tweets/tweet-form', { errors })
  }
}

exports.tweetEdit = async (req, res, next) => {
  const tweetId = req.params.tweetId;
  try {
    const tweet = await getTweet(tweetId);
    res.render('tweets/tweet-form', { tweet });
  } catch(e) {
    next();
  }
}

exports.tweetUpdate = async (req, res, next) => {
  const tweetId = req.params.tweetId;
  try {
    const body = req.body;
    await updateTweet(tweetId, body);
    res.redirect('/tweets');
  } catch(e) {
    const errors = Object.keys(e.errors).map( key => e.errors[key].message);
    const tweet = await getTweet(tweetId);
    res.status(400).render('tweets/tweet-form', { tweet, errors })
  }
}

exports.tweetDelete = async (req, res, next) => {
  const tweetId = req.params.tweetId;
  try {
    await deleteTweet(tweetId);
    const tweets = await getTweets();
    res.render('tweets/tweet-list', { tweets })
  } catch(e) {
    next(e);
  }
}