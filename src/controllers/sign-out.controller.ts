import { Tweet } from '../interfaces/Tweet';
import { Status } from '../interfaces/Status';
import {Request, Response} from "express";

export function signOut(request: Request, response : Response) {
  const status : Status = {status: 200, message: "sign out successful", data: null};
  const session : any = request.session?.profile ?? undefined;

  const executeSignOut = () => {
    console.log(session);
  };

  const signOutFailed = () => {
    status.status = 400;
    status.message = "you are not signed in";
  };

  session ? executeSignOut() : signOutFailed();

  return response.json(status)
}

