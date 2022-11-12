import express = require('express');
import Bcrypt = require('bcryptjs');
import { User } from '../models/user';
import signToken from '../utils/signToken';
import refreshToken from '../utils/refreshToken';
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
    console.log(`Attempting Login`)
    User.findOne({username : req.body.username})
    .then((user) => {
        if (user) {
            Bcrypt.compare(req.body.password, user.password, (error, result) => {
                console.info("Comparing Password")
                if(!result) {
                    return res.status(401).json({
                        success : false,
                        message : "Incorrect Password!"
                    })
                } 
                else if (result) {
                    let tk = signToken(user, (err, token, refreshToken) => {
                        if (err) {
                            return res.status(500).json({
                                success : false,
                                message : err.message,
                                error : err,
                            })
                        }
                        else if (token) {
                            console.log("Testing token")
                            if(refreshToken) {
                                console.log("Passing refreshToken")
                                res.cookie('jwt', refreshToken, 
                                    {
                                        httpOnly:true,
                                        secure: true,
                                        sameSite: "none",
                                    })
                                    return res.status(200).json({
                                        success : true,
                                        message : "Authenticated",
                                        token: token
                                    });
                            }   
                        }
                    });
                }
                else if(error) {
                    return res.status(401).json({
                        success : false,
                        message : "Password Input Failure"
                    })
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

const refresh = async (req : express.Request, res : express.Response) => {
    console.log("within refresh")
    var newToken = await refreshToken(req.cookies.jwt);
    console.log("new token")
    console.log(newToken);
    if (newToken) {
        return res.status(200).json({
            success : true,
            message : "Token Refreshed",
            token: newToken
        });
    }
    return res.status(404).json({
        success : false,
        message : "Token Refresh Fail",
    })
}

export default { login, register, refresh };