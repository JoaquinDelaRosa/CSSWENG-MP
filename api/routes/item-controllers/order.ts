import express = require('express');
import { Order } from '../../models/order';

const router = express.Router();

router.get("/all", async (req: express.Request, res: express.Response) => {
    Order.find({})
    .then ((data) => {
        res.json(data);
    })
});
router.get("/id", async (req: express.Request, res: express.Response) => {
    Order.find({id: req.query.id})
    .then((data) => {
        res.json(data);
    });
});

router.get("/id", async (req: express.Request, res: express.Response) => {
    Order.find({id: req.query.id})
    .then((data) => {
        res.json(data);
    });
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

router.delete("/delete", (req: express.Request, res: express.Response) => {
    Order.deleteOne({id: req.query.id})
    .then((delRes) => {
        res.end();
    })
    .catch((error) => {
        console.log(error);
        res.end();
    });
});

router.get("/filter", async (req: express.Request, res: express.Response) => {
    const query : orderQuery = makeQuery(req);

    Order.find({status: query.status, type: query.type})
    .then ((data) => {
        res.json(data);
    })
})


interface orderQuery {
    status : string
    type: string
}

const makeQuery = (req : express.Request)  : orderQuery=> {
    return {
        status: (req.query.status) ? (req.query.status as string) : "",
        type: (req.query.type) ? (req.query.type as string) : "",
    }
}

export default router;