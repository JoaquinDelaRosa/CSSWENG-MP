import  express = require('express');
import { Vehicle } from '../../models/vehicle';

const router = express.Router();

router.get("/all", async (req: express.Request, res: express.Response) => {
    Vehicle.find({})
    .skip(parseInt(req.query.skip as string))
    .limit(parseInt(req.query.limit as string))
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

router.get("/filter", async (req: express.Request, res: express.Response) => {
    const query : VehicleQuery = makeQuery(req);

    Vehicle.find({
        licensePlate: query.licensePlate,
        make: query.make,
        model: query.model,
        yearManufactured: query.yearManufactured
    })
    .skip(parseInt(req.query.skip as string))
    .limit(parseInt(req.query.limit as string))
    .then((result) => {
        res.json(result);
        res.end();
    }).catch((err) => {
        console.log(err);
        res.end();
    });
})


interface VehicleQuery {
    licensePlate: string,
    make: string,
    model: string,
    yearManufactured: number
}

const makeQuery = (req : express.Request) : VehicleQuery=> {
    return {
        licensePlate: (req.query.licensePlate) ? (req.query.licensePlate as string) : "",
        make: (req.query.make) ? (req.query.make as string) : "",
        model: (req.query.model) ? (req.query.model as string) : "",
        yearManufactured: (req.query.yearManufactured) ? parseInt(req.query.licensePlate as string) : -1,
    }
}

export default router;