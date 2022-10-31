"use strict";
/*
 * GET users listing.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const customer_1 = require("../../models/customer");
const router = express.Router();
router.get("/all", (req, res) => {
    customer_1.Customer.find(() => {
    });
});
router.post("/create", (req, res) => {
    console.log(req.body);
    customer_1.Customer.create(req.body, (error) => {
        console.log(error);
    });
});
module.exports = router;
