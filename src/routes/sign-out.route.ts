import { Router } from 'express';
import {SignInRouter} from "./sign-in.route";

export const signOutRoute = Router();

signOutRoute.route("/")
  .get(signout())
