/*
 * GET users listing.
 */

import express from 'express';
import { Customer } from '../../models/customer';


const router = express.Router();

router.get("/all",  async (req: express.Request, res: express.Response) => {
    Customer.find({})
    .then ((data) => {
        res.json(data);
    })
});

router.get("/id", async (req: express.Request, res: express.Response) => {
    Customer.find({id: req.query.id})
    .then((data) => {
        res.json(data);
    })
})

router.post("/create", (req: express.Request, res: express.Response) => {
    console.log(req.body)
    Customer.create(req.body, (error, result) => {
        console.log(error);
        return result;
    })
    res.json(req.body);
    res.end();
})

router.post("/update", (req: express.Request, res: express.Response) => {
    Customer.updateOne({id : req.query.id}, req.body, (error) => {
        if(error) {
            console.log(error);
            res.json(null);
        }
        else {
            res.json(req.body);
        }
    })
})

router.delete("/delete", (req : express.Request, res : express.Response) => {
    Customer.deleteOne({id: req.query.id})
    .then ((result) => {
        res.end();
    })
    .catch((error) => {
        console.log(error);
        res.end();
    })
})

module.exports = router;