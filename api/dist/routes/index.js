"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require('path');
const router = express.Router();
router.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"));
});
exports.default = router;
