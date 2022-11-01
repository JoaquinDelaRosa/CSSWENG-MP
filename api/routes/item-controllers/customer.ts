/*
 * GET users listing.
 */

import express = require('express');
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

router.get("/filter", async (req: express.Request, res: express.Response) => {
    const query : customerQuery = makeQuery(req);

    Customer.aggregate([
        {
            $project : {
                "name" : { 
                    $concat : ["$firstName", " ", "$lastName"]
                }
            }
        },
        {
            $match :  {"name": {$regex: ".*" + query.name + ".*"}}
        }
    ])
})


interface customerQuery {
    name : string
}

const makeQuery = (req : express.Request) => {
    return {
        name: 
            (req.query.firstName) ? (req.query.firstName as string) : "" + 
            (req.query.lastName) ? (req.query.lastName as string) : ""
    }
}

module.exports = router;