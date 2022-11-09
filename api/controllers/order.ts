import { randomUUID } from 'crypto';
import express = require('express');
import { Customer } from '../models/customer';
import { Order } from '../models/order';
import { Vehicle } from '../models/vehicle';
import { makeOrderArrayView, makeOrderView } from '../projections/order';

const all = async (req: express.Request, res: express.Response) => {
    Order.find({})
    .populate("customer")
    .populate("vehicle")
    .skip(parseInt(req.query.skip as string))
    .limit(parseInt(req.query.limit as string))
    .then ((data) => {
        res.json(data);
    })
};

const id = async (req: express.Request, res: express.Response) => {
    Order.find({id: req.query.id})
    .populate("customer")
    .populate("vehicle")
    .then((data) => {
        res.json(data);
    })
};

const create = async (req: express.Request, res: express.Response) => {
    // const c_id = await Customer.exists({id :req.body.customerId});
    // if (c_id == null){
    //     res.end();
    //     return;
    // }
    // const v_id = await Vehicle.exists({id :req.body.vehicleId});
    // if (v_id == null){
    //     res.end();
    //     return;
    // }
    
    Order.create({...req.body, id: randomUUID()}, (error, result) => {
        console.log(error);
        return result;
    });
    res.json(req.body);
    res.end();
};

const update = async (req: express.Request, res: express.Response) => {
    const c_id = await Customer.exists({id :req.body.customerId});
    if (c_id == null){
        res.end();
        return;
    }
    const v_id = await Vehicle.exists({id :req.body.vehicleId});
    if (v_id == null){
        res.end();
        return;
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
};

const remove = (req: express.Request, res: express.Response) => {
    Order.deleteOne({id: req.query.id})
    .then((delRes) => {
        res.end();
    })
    .catch((error) => {
        console.log(error);
        res.end();
    });
};

const filter = async (req: express.Request, res: express.Response) => {
    const query : OrderQuery = makeQuery(req);

    Order.find({status: query.status, type: query.type})
    .populate("customer")
    .populate("vehicle")
    .skip(parseInt(req.query.skip as string))
    .limit(parseInt(req.query.limit as string))
    .then ((data) => {
        res.json(data);
    });
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
