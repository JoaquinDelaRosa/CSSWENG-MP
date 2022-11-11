import  express = require('express');
import { Vehicle } from '../models/vehicle';
import { ALL_ROLES, Roles } from '../models/enum';
import { makeVehicleArrayView, makeVehicleView } from '../projections/vehicle';
import { randomUUID } from 'crypto';

const all = async (req: express.Request, res: express.Response) => {
    Vehicle.find({})
    .skip(parseInt(req.query.skip as string))
    .limit(parseInt(req.query.limit as string))
    .then((data) => {
        res.json(makeVehicleArrayView(data));
    })
};

const id = async (req: express.Request, res: express.Response) => {
    Vehicle.findOne({id : req.query.id})
    .then((data) => {
        res.json(makeVehicleView(data));
    })
};

const create = (req: express.Request, res: express.Response) => {
    Vehicle.create({...req.body, id: randomUUID()}, (error, result) => {
        if (error){
            console.log(error);
        }
        return result;
    });
    res.json(req.body);
    res.end();
};


const update = (req: express.Request, res: express.Response) => {
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
};

const remove = (req: express.Request, res: express.Response) => {
    Vehicle.deleteOne({id: req.query.id})
    .then((delRes) => {
        res.end();
    })
    .catch((err) => {
    console.log(err);
    res.end();
    });;
};

const filter = async (req: express.Request, res: express.Response) => {
    const query : VehicleQuery = makeQuery(req);
    
    Vehicle.find(makeMongooseQuery(query))
    .skip(parseInt(req.query.skip as string))
    .limit(parseInt(req.query.limit as string))
    .then((result) => {
        res.json(makeVehicleArrayView(result));
        res.end();
    }).catch((err) => {
        console.log(err);
        res.end();
    });
}


interface VehicleQuery {
    licensePlate: string,
    model: string,
    manufacturer: string,
    yearManufactured: number
}

const makeMongooseQuery = (q : VehicleQuery) : any => {
    let query =  {
        licensePlate: {$regex: ".*" + q.licensePlate + ".*"},
        model: {$regex: ".*" + q.model + ".*"},
        manufacturer: {$regex: ".*" + q.manufacturer + ".*"}
    }

    if (q.yearManufactured > 0){
        query["yearManufactured"] = q.yearManufactured;
    }

    return query;
}

const makeQuery = (req : express.Request) : VehicleQuery=> {
    return {
        licensePlate: (req.query.licensePlate) ? (req.query.licensePlate as string) : "",
        model: (req.query.model) ? (req.query.model as string) : "",
        manufacturer: (req.query.manufacturer) ? (req.query.manufacturer as string) : "",
        yearManufactured: (req.query.yearManufactured) ? parseInt(req.query.yearManufactured as string) : -1,
    }
}

export default {all, id, create, update, remove, filter};
