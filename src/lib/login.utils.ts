import { Profile } from '../interfaces/Profile';

const crypto = require('crypto');
const jwt = require('jsonwebtoken');

interface HashedPassword {
    hash: string,
    salt: string,
}

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
  return crypto.randomBytes(16);
}

export function setPassword (password: string) : HashedPassword {
  const salt = crypto.randomBytes(16);
  const hash = crypto.pbkdf2Sync(password, salt, 238722, 512, 'sha512').toString('hex');
  return { hash, salt };
}

export function validatePassword (password: string, profile: Profile) : boolean {
  const unprovenHash = crypto.pbkdf2Sync(password, profile.profileSalt, 238722, 512, 'sha512').toString('hex');
  return unprovenHash === profile.profileHash;
}
