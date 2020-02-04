import { Router } from 'express';
import { asyncValidator } from '../lib/asyncValidator';
import { signupProfile } from '../controllers/sign-up.controller';
import { signInValidator } from '../validators/sign-in.validator';
import {signIn} from "../controllers/sign-in.controller";

const { checkSchema } = require('express-validator');

import csurf from "csurf"

const csrf = csurf({cookie: false});

export const SignInRouter = Router();

SignInRouter.route('/')
  .post(csrf,asyncValidator(checkSchema(signInValidator)), signIn);
