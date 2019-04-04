module.exports = app => {
    const Tweet = app.mongoose.model("Tweet", 
    new app.mongoose.Schema({
        author: String,
        content: String,
        likes: {
            type: Number,
            default: 0,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }));

    return Tweet;
}