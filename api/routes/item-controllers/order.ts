import express = require('express');
import { Order } from '../../models/order';
import { API_PREFIX } from '../api';

const router = express.Router();

router.get("/all", async (req: express.Request, res: express.Response) => {
    Order.find({})
    .then ((data) => {
        res.json(data);
    })
});

router.post("/create", (req: express.Request, res: express.Response) => {
    console.log(req.body);
    Order.create(req.body, (error, result) => {
        console.log(error);
        return result;
    });
    res.json(req.body);
    res.end();
});

router.get("/id", async (req: express.Request, res: express.Response) => {
    Order.find({id: req.query.id})
    .then((data) => {
        res.json(data);
    });
});

router.post("/update", (req: express.Request, res: express.Response) => {
    Order.updateOne({id: req.query.id}, req.body, (error) => {
        if (error) {
            console.log(error);
            res.json(null);
        }
        else {
            res.json(req.body);
        }
    });
});

router.post("/delete", (req: express.Request, res: express.Response) => {
    Order.deleteOne({id: req.query.id})
    .then((delRes) => {
        res.end();
    })
    .catch((error) => {
        console.log(error);
        res.end();
    });
});

export default router;