import  express = require('express');
import { Vehicle } from '../models/vehicle';
import { ALL_ROLES, Roles } from '../models/enum';
import { makeVehicleArrayView, makeVehicleView } from '../projections/vehicle';
import { ValidateWrapper } from '../middleware/validation';

const router = express.Router();

const all = async (req: express.Request, res: express.Response) => {
    ValidateWrapper(req, res, ALL_ROLES, () => {
        Vehicle.find({})
        .skip(parseInt(req.query.skip as string))
        .limit(parseInt(req.query.limit as string))
        .then((data) => {
            res.json(makeVehicleArrayView(data));
        })
    })
};

const id = async (req: express.Request, res: express.Response) => {
    ValidateWrapper(req, res, ALL_ROLES, () => {
        Vehicle.find({id : req.query.id})
        .then((data) => {
            res.json(makeVehicleView(data));
        })
    })
};

const create = (req: express.Request, res: express.Response) => {
    ValidateWrapper(req, res, [Roles.ADMIN, Roles.VIEW_EDIT], () => { 
        Vehicle.create(req.body, (error, result) => {
            if (error){
                console.log(error);
            }
            return result;
        });
        res.json(req.body);
        res.end();
    })
};


const update = (req: express.Request, res: express.Response) => {
    ValidateWrapper(req, res, [Roles.ADMIN, Roles.VIEW_EDIT], () => { 
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
    })
};

const remove = (req: express.Request, res: express.Response) => {
    ValidateWrapper(req, res, [Roles.ADMIN, Roles.VIEW_EDIT], () => { 
        Vehicle.deleteOne({id: req.query.id})
        .then((delRes) => {
            res.end();
        })
        .catch((err) => {
        console.log(err);
        res.end();
        });;
    })
};

const filter = async (req: express.Request, res: express.Response) => {
    ValidateWrapper(req, res, ALL_ROLES, () => { 
        const query : VehicleQuery = makeQuery(req);
        Vehicle.find({
            licensePlate: query.licensePlate,
            model: query.model,
            manufacturer: query.manufacturer,
            yearManufactured: query.yearManufactured
        })
        .skip(parseInt(req.query.skip as string))
        .limit(parseInt(req.query.limit as string))
        .then((result) => {
            res.json(makeVehicleArrayView(result));
            res.end();
        }).catch((err) => {
            console.log(err);
            res.end();
        });
    })
}


interface VehicleQuery {
    licensePlate: string,
    model: string,
    manufacturer: string,
    yearManufactured: number
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
