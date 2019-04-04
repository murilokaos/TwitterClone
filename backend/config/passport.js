const passport = require('passport');
const passportJwt = require('passport-jwt');
const { Strategy, ExtractJwt } = passportJwt;

module.exports = app => {
    const params = {
        secretOrKey: app.env.authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (payload, done) => {
        // POSTGRESQL
        // app.db('users')
        //     .where({ id: payload.id })
        //     .first()
        //     .then(user => done(null, user ? { ...payload } : false))
        //     .catch(err => done(err, false))

        //MONGODB
        app.models.User.findById({ _id: payload.id })
            .then(user => done(null, user ? {...payload } : false))
            .catch(err => done(err, false))
    })

    passport.use(strategy)

    return {
        authenticate: () => passport.authenticate('jwt', { session: false })
    }
}