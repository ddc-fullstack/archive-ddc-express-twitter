import {NextFunction, Request, Response} from 'express';
import { Status } from '../interfaces/Status';
const passport = require("passport");
const { validationResult } = require('express-validator');

export async function signIn(request : Request, response: Response, nextFunction : NextFunction) {
    try{
        validationResult(request).throw();

        passport.authenticate(
            'local',
            {session: false},
            (err: any, passportUser: any, info: any) => {

                console.log(info);
            if (err) {
             console.log(err)
            }

            if (passportUser) {
                return response.json("sick")
            }

        })
    } catch (error) {
        console.log(error)

    }


}
