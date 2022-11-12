import express = require('express');
import Bcrypt = require('bcryptjs');
import { User } from '../models/user';
import signToken from '../utils/signToken';
import { randomUUID } from 'crypto';

const register =  (req : express.Request, res : express.Response) => {
    const newUser = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        username : req.body.username,
        password : Bcrypt.hashSync(req.body.password, 10),
        role : req.body.role
    }
    User.create({_id : randomUUID(), ...newUser})
    .then(() => {
        res.end()
    }).catch((err) => {
        console.log(err);
    });
}

const login = (req : express.Request, res : express.Response) => {
    User.findOne({username : req.body.username})
    .then((user) => {
        if (user) {
            Bcrypt.compare(req.body.password, user.password, (error, result) => {
                console.info("Comparing Password")
                if(error) {
                    return res.status(401).json({
                        success : false,
                        message : "Incorrect Password!"
                    })
                } 
                else if (result) {
                    let tk = signToken(user, (err, token) => {
                        if (err) {
                            return res.status(500).json({
                                success : false,
                                message : err.message,
                                error : err,
                            })
                        }
                        else if (token) {
                            res.status(200).json({
                                success : true,
                                message : "Authenticated",
                                token: token
                            })
                        }
                    });
                }
            });
        } 
        else {
            res.json({
                success : false, 
                error : "User does not exist",
            });
        }
            
    })
    .catch((error) => {
        res.json({
            success : false, 
            error : error
        });
    })
}

export default { login, register };