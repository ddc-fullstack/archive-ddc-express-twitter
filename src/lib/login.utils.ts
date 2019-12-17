import { Profile } from '../interfaces/Profile';
import { Request } from 'express';
import * as argon2 from 'argon2';

const crypto = require('crypto');
const jwt = require('jsonwebtoken');

export function generateJwt (profile : Profile) : any {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    profileEmail: profile.profileEmail,
    ProfileId: profile.profileId,
    exp: expirationDate.getTime() / 1000
  }, 'secret');
}

export function setActivationToken () : string {
  return crypto.randomBytes(16).toString('hex');
}

export async function setPassword (password: string) : Promise<string> {
  return argon2.hash(
    password,
    {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      hashLength: 32
    });
}

export async function validatePassword (hash: string, password: string) : Promise<boolean> {
  return argon2.verify(
    hash,
    password,
    {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      hashLength: 32
    });
}

export const getTokenFromHeaders = (request : Request) => {
  const { headers: { authorization } } = request;

  if (authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1];
  }
  return null;
};
