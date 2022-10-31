import  express = require('express');
import { Vehicle } from '../../models/vehicle';

const router = express.Router();

router.get("/all", async (req: express.Request, res: express.Response) => {
    Vehicle.find({})
    .then((data) => {
        res.json(data);
    })
});

router.get("/id", async (req: express.Request, res: express.Response) => {
    Vehicle.find({id : req.query.id})
    .then((data) => {
        res.json(data);
    })
});

router.post("/create", (req: express.Request, res: express.Response) => {
    Vehicle.create(req.body, (error, result) => {
        if (error){
            console.log(error);
        }
        return result;
    });
    res.json(req.body);
    res.end();
});


router.post("/update", (req: express.Request, res: express.Response) => {
    Vehicle.updateOne({id: req.query.id}, req.body, (err) => {
        if (err){
            console.log(err);
            res.json(null)
        }
        else {
            res.json(req.body);
        }
        res.end();
    })
});

router.delete("/delete", (req: express.Request, res: express.Response) => {
    Vehicle.deleteOne({id: req.query.id})
    .then((delRes) => {
        res.end();
    })
    .catch((err) => {
      console.log(err);
      res.end();
    });;
});

export default router;