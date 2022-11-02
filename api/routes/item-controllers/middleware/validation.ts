import express = require('express');
import Bcrypt = require('bcryptjs');
import { rejects } from 'assert';
import { EncryptionKeyJWT } from '../authz';
import { User } from '../../../models/user';

const JWT = require('jsonwebtoken');
const router = express.Router();

export const ValidateToken = (req : express.Request) => {
    try {
        JWT.verify(req.headers.authorization, EncryptionKeyJWT);
    }
    catch (err){
        return null;
    }

}

export const ValidateRole = (req : express.Request, roles) : boolean => {
    const token = ValidateToken(req) == null;
    if (token == null){
        return false;
    }

    const decoded = JWT.decode(token);

    if (decoded.role in roles){
        return true;
    }
    return false;
}

export const ValidateWrapper = (req: express.Request, res : express.Response, roles : Array<string>, callback) => {
    if(ValidateRole(req, roles)){
       callback(); 
    }
    else {
        res.status(401);
        res.end();
    }
}