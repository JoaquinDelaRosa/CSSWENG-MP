import express = require('express');
const serverless = require("serverless-http")
import controller from "../controllers/authz";
const router = express.Router();

router.post('/register', controller.register) 
router.post('/login', controller.login)       
router.post('/logout', controller.logout)

export default serverless(router);