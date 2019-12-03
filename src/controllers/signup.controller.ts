import {Request, Response} from 'express'

// DB
import {connect} from '../database'
// Interfaces (represent the DB model and types of the columns associated with a specific DB table)
import {Profile} from '../interfaces/Profile'
import {Status} from "../interfaces/Status";

const {validationResult} = require('express-validator');

export async function signupProfile(request: Request, response: Response) {


    try {
        // const mysqlConnection = await connect();
        validationResult(request).throw();

        const profile : Profile = {profileId: null, ...request.body};

        //const query : string = "INSERT INTO profile(profileId, profileActivationToken, profileAtHandle, profileAvatarUrl,  profileEmail, profileHash, profilePhone) VALUES (UUID_TO_BIN(UUID()) , :profileActivationToken, :profileAtHandle, :profileAvatarUrl, :profileEmail, :profileHash, :profilePhone)";

        // const mysqlResult = await mysqlConnection.execute(query, profile);
        const status: Status = {
            status: 200,
            message: 'Tweet Updated',
            data: null
        };

        return response.json(status)
    } catch(error) {
        console.log()
        ;
    }

}