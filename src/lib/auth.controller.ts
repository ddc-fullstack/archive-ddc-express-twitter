import passport from 'passport';
import passportLocal, { Strategy } from 'passport-local';
import { getProfileByProfileEmail } from './getProfileByProfileEmail';

const LocalStrategy = passportLocal.Strategy;

const passportStrategy : Strategy = new LocalStrategy(
    {
        usernameField: 'profileEmail',
        passwordField: "profilePassword"
    },
    async (email, password, done) => {
  try {

    console.log("hello world");
    const profile : any = await getProfileByProfileEmail(email);
    console.log(profile);



    return done(undefined, false, { message: 'I work?' });
  } catch (error) {
    return done(error);
  }
});

export const  passportMiddleware = passport.use(passportStrategy);
