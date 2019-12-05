import passport from "passport";
import passportLocal, {Strategy} from "passport-local";
import {getProfileByProfileEmail} from "../lib/getProfileByProfileEmail";

const LocalStrategy = passportLocal.Strategy;

const passportStrategy : Strategy  = new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
   try {
       const profile : any =  await getProfileByProfileEmail(email);
       console.log(profile);
       return done(undefined ,false, {message: "I work?"})
   } catch (error) {
       return done(error)
   }
});

passport.use(passportStrategy);
