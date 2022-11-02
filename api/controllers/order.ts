import express = require('express');
import { Customer } from '../models/customer';
import { ALL_ROLES, Roles } from '../models/roles';
import { Order } from '../models/order';
import { Vehicle } from '../models/vehicle';
import { makeOrderArrayView, makeOrderView } from '../projections/order';
import { ValidateRole, ValidateWrapper } from '../middleware/validation';

const router = express.Router();

const all = async (req: express.Request, res: express.Response) => {
    ValidateWrapper(req, res, ALL_ROLES, () => {
        Order.find({})
        .populate("customer")
        .populate("vehicle")
        .skip(parseInt(req.query.skip as string))
        .limit(parseInt(req.query.limit as string))
        .then ((data) => {
            res.json(data);
        })
    })
};

const id = async (req: express.Request, res: express.Response) => {
    ValidateWrapper(req, res, ALL_ROLES, () => {
        Order.find({id: req.query.id})
        .populate("customer")
        .populate("vehicle")
        .then((data) => {
            res.json(data);
        })
    })
};

const create = async (req: express.Request, res: express.Response) => {
    ValidateWrapper(req, res, [Roles.ADMIN, Roles.VIEW_EDIT], async () => {
        const c_id = await Customer.exists({id :req.body.customerId});
        if (c_id == null){
            res.end();
        }
        const v_id = await Vehicle.exists({id :req.body.vehicleId});
        if (v_id == null){
            res.end();
        }
        
        Order.create(req.body, (error, result) => {
            console.log(error);
            return result;
        });
        res.json(req.body);
        res.end();
    })
};

const update = async (req: express.Request, res: express.Response) => {
    ValidateWrapper(req, res, [Roles.ADMIN, Roles.VIEW_EDIT], async () => {
        const c_id = await Customer.exists({id :req.body.customerId});
        if (c_id == null){
            res.end();
        }
        const v_id = await Vehicle.exists({id :req.body.vehicleId});
        if (v_id == null){
            res.end();
        }

        Order.updateOne({id: req.query.id}, req.body, (error) => {
            if (error) {
                console.log(error);
                res.json(null);
            }
            else {
                res.json(req.body);
            }
        });
    })
};

const remove = (req: express.Request, res: express.Response) => {
    ValidateWrapper(req, res, [Roles.ADMIN, Roles.VIEW_EDIT], () => {
        Order.deleteOne({id: req.query.id})
        .then((delRes) => {
            res.end();
        })
        .catch((error) => {
            console.log(error);
            res.end();
        });
    })
};

const filter = async (req: express.Request, res: express.Response) => {
    ValidateWrapper(req, res, ALL_ROLES, () => {
        const query : OrderQuery = makeQuery(req);

        Order.find({status: query.status, type: query.type})
        .populate("customer")
        .populate("vehicle")
        .skip(parseInt(req.query.skip as string))
        .limit(parseInt(req.query.limit as string))
        .then ((data) => {
            res.json(data);
        });
    })
}


interface OrderQuery {
    status : string
    type: string
}

const makeQuery = (req : express.Request)  : OrderQuery=> {
    return {
        status: (req.query.status) ? (req.query.status as string) : "",
        type: (req.query.type) ? (req.query.type as string) : "",
    }
}

export default {all, id, create, update, remove, filter};