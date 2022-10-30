import router from ".";
import express = require('express');
import { Sequelize, Model } from "sequelize";
import { Customer } from "../models/customer.js"


router.get('/api/Customer/all', async (rec : express.Request, res : express.Response) => {
    const customers = await Customer.findAll();

    return customers;
})
