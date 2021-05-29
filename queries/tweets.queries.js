const Tweet = require('../database/models/tweet.model')

exports.getTweets = () => {
  return Tweet.find({}).exec();
};

exports.getTweet = (tweetId) => {
  return Tweet.findOne({_id: tweetId}).exec();
};

exports.createTweet = (tweet) => {
  const newTweet = new Tweet(tweet);
  return newTweet.save();
};

exports.updateTweet = (tweetId, tweet) => {
  Tweet.findByIdAndUpdate(tweetId, { $set: tweet }, { runValidators: true })
  const newTweet = new Tweet(tweet);
  return newTweet.save();
};

exports.deleteTweet = (tweetId) => {
  return Tweet.findByIdAndDelete(tweetId).exec();
};

exports.getCurrentUserTweetsWithFollowing = (user) => {
  return Tweet.find({ author: { $in: [ ...user.following, user._id ] }}).populate('author').exec();
}

exports.getUserTweetsByAuthorId = (authorId) => {
  return Tweet.find({ author: authorId }).populate('author').exec();
}