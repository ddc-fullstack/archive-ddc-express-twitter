import {Request, Response} from 'express'

// DB
import {connect} from '../database'
// Interfaces (represent the DB model and types of the columns associated with a specific DB table)
import {Profile} from '../interfaces/Profile'
import {Status} from "../interfaces/Status";
import {setActivationToken, setPassword} from "../lib/login.utils";

const {validationResult} = require('express-validator');

export async function signupProfile(request: Request, response: Response) {


    try {
        validationResult(request).throw();
        const {profileAtHandle,  profileAvatarUrl, profileEmail, profilePhone, profilePassword } = request.body;
        const mysqlConnection = await connect();
        const {hash, salt} = setPassword(profilePassword);
        const profileActivationToken = setActivationToken();

        const profile : Profile = {profileId: null, profileActivationToken, profileAtHandle, profileAvatarUrl, profileEmail, profileHash: hash, profileSalt: salt, profilePhone};

        const query : string = "INSERT INTO profile(profileId, profileActivationToken, profileAtHandle, profileAvatarUrl,  profileEmail, profileHash, profilePhone, profileSalt ) VALUES (UUID_TO_BIN(UUID()) , :profileActivationToken, :profileAtHandle, :profileAvatarUrl, :profileEmail, :profileHash, :profilePhone, :profileSalt)";

        await mysqlConnection.execute(query, profile);
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