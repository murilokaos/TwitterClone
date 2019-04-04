// rotas
module.exports = app => {

    app.post("/user/login", app.api.auth.signin);
    app.post("/user/register", app.api.user.save);

    app.route("/tweets")
        .all(app.config.passport.authenticate())
        .get(app.api.tweet.get)
        .post(app.api.tweet.save);

    app.route("/likes/:id")
        .all(app.config.passport.authenticate())
        .post(app.api.like.save);
    
    app.route("/user/:id")
        .all(app.config.passport.authenticate())
        .get(app.api.user.get);
};