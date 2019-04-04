module.exports = app => {
    const save = async (req, res, next) => {
        const tweet = await app.models.Tweet.findById(req.params.id);

        tweet.set({ likes: tweet.likes + 1 });

        await tweet.save();
        req.io.emit('like', tweet);

        res.json(tweet);
    }

    return { save }
}