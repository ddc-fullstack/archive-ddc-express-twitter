import {NextFunction, Request, Response} from 'express';
import {JsonWebTokenError, TokenExpiredError, verify} from "jsonwebtoken";
import {Status} from "../interfaces/Status";


export function isLoggedIn(request: Request, response: Response, next: NextFunction): any {

    const getJwtTokenFromHeader = (headers: any): string => {
        return headers["x-jwt-token"];
    };
    const unverifiedJwtToken: string = getJwtTokenFromHeader(request.headers);

    const isJwtValid: any = unverifiedJwtToken ?
        verify(
            unverifiedJwtToken,
            "secret",
            {maxAge: "1hr"},
            (error: any, decoded: any) => error ? false : true
        ) : false;

    const status : Status = {status: 400, message: "Please login", data: null};
    return isJwtValid ? next() : response.json(status);
}


