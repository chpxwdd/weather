const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const opts = {}

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'secret' // SET YOUSELF

module.exports = passport => {
  const modelCoreUser = mongoose.model('CoreUser')

  passport.use(
    new JWTStrategy(opts, (jwt_payload, done) => {
      modelCoreUser
        .findById(jwt_payload.id)
        .then(user => {
          return done(null, user ? user : false)
        })
        .catch(err => console.error(err))
    })
  )
}
