
const OutlookStrategy = require("passport-outlook").Strategy;
const passport = require("passport");
var LocalStrategy = require('passport-local');

OUTLOOK_APP_ID = "f1aa0dbd-018c-4c77-b579-28fa18a28186";//LVI8Q~evGZ03ddEpKMypG8_oYuW4tInPDA8Pla1R
OUTLOOK_APP_SECRET = "LVI8Q~evGZ03ddEpKMypG8_oYuW4tInPDA8Pla1R";//42283027-3010-444e-8b42-b9d4b8a7eb1a


passport.use(
    new OutlookStrategy(
      {
    clientID: OUTLOOK_APP_ID,
    clientSecret: OUTLOOK_APP_SECRET,
    callbackURL: '/salesreportapi/outlook/callback',proxy: true 
      },
      (accessToken, refreshToken, profile, done) => {
        //console.log('from line 20 pass');
        console.log(profile);
        //  console.log('from line 21 pass');
          done(null, profile);
        } 
    )
);

passport.use(
    new LocalStrategy(
      {
        usernameField: 'username',
        callbackURL: '/salesreportapi/login/callback',proxy: true 
      },
      (username, password, done) => {
        //console.log(username);
        //console.log(password);

          done(null, username, password);
        } 
    )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
