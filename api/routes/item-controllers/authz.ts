import express = require('express');
import Bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const router = express.Router();

const EncryptionKeyJWT = "cYscIXvgwx1ELOvhp2Clr91GH4faJRSLhawlqjyw";
const User = require('../../models/user');

interface Token {
    id: string,
    role: string
}

router.post("/register", (req : express.Request, res : express.Response) => {
    const newUser = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        username : req.body.firstName + "_" + req.body.lastName,
        password : Bcrypt.hashSync(req.body.password, 10),
        role : req.body.role
    }
    User.create(newUser);

});

router.post("/login",(req : express.Request, res : express.Response) => {
    User.findOne({username : req.body.username})
    .then((user) => {
        if (user) {
            if (Bcrypt.compareSync(req.body.password, user.password)) {
                const token = JWT.sign({ id: Bcrypt.hashSync(user.id), role : user.role, }, EncryptionKeyJWT)
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
});

// export const ValidateToken = (token : Token) => {
    
// }



module.exports = router