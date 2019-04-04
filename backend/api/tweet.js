//const Tweet = require('../models/Tweet')

module.exports = app => {
    const get = async (req, res) => {
        const tweets = await app.models.Tweet.find({}).sort('-createdAt');
        res.json(tweets);
    }

    const save = async (req, res) => {
        const tweet = await app.models.Tweet.create(req.body);
        req.io.emit('tweet', tweet);
        res.json(tweet);
    }

    return { get, save }
};