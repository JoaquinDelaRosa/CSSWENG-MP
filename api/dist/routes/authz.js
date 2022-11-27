"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const authz_1 = __importDefault(require("../controllers/authz"));
const router = express.Router();
router.post('/register', authz_1.default.register);
router.post('/login', authz_1.default.login);
router.post('/logout', authz_1.default.logout);

exports.default = router;
