"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const serverless = require("serverless-http");
const path = require('path');
const router = express.Router();
router.get('/', (req, res) => {
    res.json({ "message": "This ran" });
});
exports.default = serverless(router);
