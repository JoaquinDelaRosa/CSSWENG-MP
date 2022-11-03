import express = require('express');
import Bcrypt = require('bcryptjs');
import { User } from '../models/user';
const JWT = require('jsonwebtoken');
const router = express.Router();

export const EncryptionKeyJWT = "cYscIXvgwx1ELOvhp2Clr91GH4faJRSLhawlqjyw";

const register =  (req : express.Request, res : express.Response) => {
    const newUser = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        username : req.body.username,
        password : Bcrypt.hashSync(req.body.password, 10),
        role : req.body.role
    }
    User.create(newUser);
    res.end();
}

const login = (req : express.Request, res : express.Response) => {
    User.findOne({username : req.body.username})
    .then((user) => {
        if (user) {
            if (Bcrypt.compareSync(req.body.password, user.password)) {
                const token = JWT.sign({ id: user.id, role : user.role, }, EncryptionKeyJWT, {expiresIn : '10s'});
                res.json({success : true, token: token})
            }
            else
                res.json({success : false, error : "Wrong username or password"})
        }
        else
            res.json({success : false, error : "User does not exist"});
    })
    .catch((error) => {
        res.json({success : false, error : error});
    })
}

export default { login, register };