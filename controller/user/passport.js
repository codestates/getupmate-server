const { user }= require('../../models');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const googleCredentials = require('../../config/google.json');
const { request } = require('express');

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
    const email = profile._json.email;
    console.log('profile : ',profile);
    const nickname = profile.name.givenName;
    const User = await user.findOne(
      { 
        where: { 
          email: email,
          password : profile.id
        }
      }
    )
    if(User) {
      console.log('User : ',User);
      request.session.email = User.dataValues.email;
      request.session.id = User.dataValues.id;
      request.session.photo = `http://www.gijigae.com:3000/upload/${User.dataValues.id}-photo.jpeg`;
      console.log(request.session);
      return cb(null, User)
    } 
    else {
      const newUser = await user.create({
        nickname: nickname,
        email: email,
        password : profile.id
      })
      console.log('create!');
      request.session.email = email;
      request.session.id = newUser.dataValues.id;
      request.session.photo = `http://www.gijigae.com:3000/upload/${newUser.dataValues.id}-photo.jpeg`;
      console.log(request.session);
      return cb(null, User)
    }
  }
));
}
