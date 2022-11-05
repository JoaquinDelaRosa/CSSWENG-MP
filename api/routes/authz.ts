import express = require('express');
import controller from "../controllers/authz";
const router = express.Router();

router.post('/register', controller.register) // register
router.post('/login', controller.login) //login

export default router;