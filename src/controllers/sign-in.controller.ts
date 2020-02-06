import {NextFunction, Response, Request} from 'express';
import  "express-session";
import {generateJwt, validatePassword} from "../lib/auth.utils";
import {Profile} from "../interfaces/Profile";

const passport = require("passport");
const {validationResult} = require('express-validator');


export async function signIn(request: Request, response: Response, nextFunction: NextFunction) {

  try {
    validationResult(request).throw();

    const {profilePassword} = request.body;


    passport.authenticate(
      'local',
      {session: false},
      async (err: any, passportUser: Profile) => {

        console.log(request?.sessionID);

        const {profileId, profileEmail} = passportUser;

        const signInSuccessful = () => {

          if (request.session) {
            request.session.profile = passportUser;
          }

          response.header({
            "X-JWT-TOKEN": generateJwt({profileId, profileEmail})
          });

          return response.json({status: 200, data: null, message: "sign in successful"})
        };

        const signInFailed = () => response.json({
          status: 400,
          data: null,
          message: "incorrect username or password"
        });

        const isPasswordValid: boolean = passportUser && await validatePassword(passportUser.profileHash, profilePassword);

        return isPasswordValid ? signInSuccessful() : signInFailed();
      })(request, response, nextFunction)
  } catch (error) {
    return response.json({status: 500, data: null, message: error.message})
  }
}
