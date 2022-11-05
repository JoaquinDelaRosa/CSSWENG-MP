import express = require('express');
import Bcrypt = require('bcryptjs');
import { rejects } from 'assert';
import { User } from '../models/user';
import { EncryptionKeyJWT } from '../controllers/encryption';

const JWT = require('jsonwebtoken');
const router = express.Router();

export const ValidateToken = (req : express.Request) => {
    try {
        JWT.verify(req.headers.authorization, EncryptionKeyJWT);
        return req.headers.authorization;
    }
    catch (err){
        return null;
    }

}

export const ValidateRole = (req : express.Request, roles : string[]) : boolean => {
    const token = ValidateToken(req) == null;
    if (token == null){
        return false;
    }
    const decoded = JWT.decode(req.headers.authorization);

    if (decoded == null){
        return true
    }
    if (roles.includes(decoded.role)){
        return true;
    }
    return false;
}

export const ValidateWrapper = (req: express.Request, res : express.Response, roles : string[], callback) => {
    if(ValidateRole(req, roles)){
       callback(); 
    }
    else {
        res.status(401);
        res.end();
    }
}