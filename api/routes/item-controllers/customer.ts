/*
 * GET users listing.
 */

import express = require('express');
import { Customer } from '../../models/customer';


const router = express.Router();

router.get("/all", (req: express.Request, res: express.Response) => {
    Customer.find(() => {

    })
});

router.post("/create", (req: express.Request, res: express.Response) => {
    console.log(req.body)
    Customer.create(req.body, (error) => {
        console.log(error);
    })
})

module.exports = router;