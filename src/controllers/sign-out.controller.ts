import { Tweet } from '../interfaces/Tweet';
import { Status } from '../interfaces/Status';
import {Request} from "express";

export function signOut(request: Request, response : Response) {
  const status : Status = {status: 200, message: "sign out successful", data: null};
  const session : any = request.session ?? undefined;

  const executeSignOut = () => {
    session.distroy()
  };

  const signOutFailed =
  session ? session.distroy()  : status.message = "No active session";









}

