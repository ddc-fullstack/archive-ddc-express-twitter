import {NextFunction, Request, Response} from 'express';
import {JsonWebTokenError, TokenExpiredError, verify, } from "jsonwebtoken";
import {Status} from "../interfaces/Status";


export function isLoggedIn(request: Request, response: Response, next: NextFunction): any {

    let status : Status = {status: 400, message: "Please login", data: null};

    const isProfileSessionActive = request.session?.profile ?? undefined;

    const isSessionActive : boolean = isProfileSessionActive ? true : false;

    const getJwtTokenFromHeader = (headers: any): string => {
        return headers["x-jwt-token"];
    };
    const unverifiedJwtToken: string = getJwtTokenFromHeader(request.headers);

    const isJwtValid: any = unverifiedJwtToken
      ? verify(
            unverifiedJwtToken,
            "secret",
            {maxAge: "3hr"},
            (error: any, decoded: any) => error ? false : true
        )
      : false;

    return isJwtValid && isSessionActive ? next() : response.json(status);
}


