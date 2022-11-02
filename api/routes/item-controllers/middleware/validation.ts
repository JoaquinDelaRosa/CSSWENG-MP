import express = require('express');
import Bcrypt = require('bcryptjs');
import { rejects } from 'assert';
import { EncryptionKeyJWT } from '../authz';
import { User } from '../../../models/user';

const JWT = require('jsonwebtoken');
const router = express.Router();

export const ValidateToken = (req : express.Request) => {
    return JWT.verify(req.headers.authorization, EncryptionKeyJWT)

}

export const ValidateRole = (req : express.Request, roles) : boolean => {
    console.log(ValidateToken(req))
    console.log(JWT.decode(req.headers.authorization))
    return false;
}