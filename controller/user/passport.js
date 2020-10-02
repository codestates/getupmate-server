const { user }= require('../../models');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const googleCredentials = require('../../config/google.json')

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(new GoogleStrategy({
    clientID: googleCredentials.web.client_id,
    clientSecret: googleCredentials.web.client_secret,
    callbackURL: googleCredentials.web.redirect_uris[0]
  },
  async function(accessToken, refreshToken, profile, cb) {
    console.log(accessToken, refreshToken)
    const email = profile.emails[0].value;
    const nickname = profile.name.givenName;
    const User = await user.findOne({ where: { email: email }})
    if(User) {
      return cb(null, User)
    } else {
      const newUser = user.create({
        nickname: nickname,
        email: email,
        googleId: profile.id
      })
      return cb(null, newUser)
    }
  }
));
}
