const mongoose = require('mongoose');
const schema = mongoose.Schema;

const tweetSchema = schema({
  content:{
    type: String,
    maxlength: [280, 'Tweet trop long!'],
    minlength: [3, 'Tweet trop court!'],
    required: true
  },
  author: { type: schema.Types.ObjectId, ref: 'user', required: true}
});

const Tweet = mongoose.model('tweet', tweetSchema);

module.exports = Tweet;