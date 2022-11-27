"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const authz_1 = require("../controllers/authz");
const router = express.Router();
router.post('/register', authz_1.default.register);
router.post('/login', authz_1.default.login);
router.post('/logout', authz_1.default.logout);
exports.default = router;
