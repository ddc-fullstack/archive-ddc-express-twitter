import {NextFunction, Request, Response} from 'express';
const {verify} = require('jsonwebtoken');

export function isLoggedIn(request: Request, response: Response, next : NextFunction): any  {

    const getJwtTokenFromHeader = (headers : any ) : string => {
         return headers["x-jwt-token"];
     };
    const unverifiedJwtToken : string =  getJwtTokenFromHeader(request.headers);
    const isJwtValid = unverifiedJwtToken ? verify(unverifiedJwtToken, "secret") : false
    console.log(isJwtValid);

    return next();
}


