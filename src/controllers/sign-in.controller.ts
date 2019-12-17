import {NextFunction, Request, Response} from 'express';
import { Status } from '../interfaces/Status';
import {body} from "express-validator";
import {validatePassword} from "../lib/auth.utils";
import {Profile} from "../interfaces/Profile";
const passport = require("passport");
const { validationResult } = require('express-validator');

export async function signIn(request : Request, response: Response, nextFunction : NextFunction) {


    try{
        validationResult(request).throw();

        const {profilePassword} = request.body;

        passport.authenticate(
            'local',
            {session: false},
            async (err: any, passportUser: Profile) => {

                const isPasswordValid = passportUser && await validatePassword(passportUser.profileHash, profilePassword);

               return isPasswordValid
                   ? response.json({status:200, data:null, message: "sign in successful"})
                   : response.json({status: 400, data:null, message: "incorrect username or password"})

        })(request, response, nextFunction)
    } catch (error) {
        return response.json("Morty")

    }
}
