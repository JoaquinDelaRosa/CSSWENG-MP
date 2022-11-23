import { randomUUID } from 'crypto';
import express = require('express');
import { Customer } from '../models/customer';
import { Order } from '../models/order';
import { Vehicle } from '../models/vehicle';
import { makeOrderArrayView } from '../projections/order';

const all = async (req: express.Request, res: express.Response) => {
    const count = await Order.countDocuments({});

    Order.find({})
    .populate("customer")
    .populate("vehicle")
    .skip(parseInt(req.query.skip as string))
    .limit(parseInt(req.query.limit as string))
    .then ((data) => {
        res.json({data: makeOrderArrayView(data), count: count ? count : 0});
    });
};

const id = async (req: express.Request, res: express.Response) => {
    Order.findOne({_id: req.query.id})
    .populate("customer")
    .populate("vehicle")
    .then((data) => {
        res.json(makeOrderArrayView(data));
    });
};

const create = async (req: express.Request, res: express.Response) => {
    Order.create({...req.body, _id: randomUUID()}, (error, result) => {
        console.log(error);
        return result;
    });
    res.json(req.body);
    res.end();
};

const update = async (req: express.Request, res: express.Response) => {
    Order.updateOne({_id: req.query.id}, req.body, (error) => {
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
    Order.deleteOne({_id: req.query.id})
    .then((delRes) => {
        res.end();
    })
    .catch((error) => {
        console.log(error);
        res.end();
    });
};

const verify = async (req: express.Request, res: express.Response) => {
    console.log(req.body.isVerified)
    Order.findByIdAndUpdate(req.query.id, {isVerified : req.body.isVerified},
        (response, error) => {
            if(response) {
                res.json({
                    success: true,
                })
            }
            else
                console.log(error);
        })
}

const filter = async (req: express.Request, res: express.Response) => {
    const query : OrderQuery = makeQuery(req);
    const mongooseQuery  = makeMongooseQuery(query);

    const customerList = await getCustomerList(mongooseQuery);
    const vehicleList = await getVehicleList(mongooseQuery);
    const finalQuery = {...mongooseQuery, customer: {$in : [customerList, ""]}, vehicle: {$in: [vehicleList, ""]}};

    const count = await Order.find(finalQuery).countDocuments();
    
    Order.find(finalQuery)
    .populate("customer")
    .populate("vehicle")
    .skip(parseInt(req.query.skip as string))
    .limit(parseInt(req.query.limit as string))
    .then ((data) => {
        res.json({data: makeOrderArrayView(data), count: count ? count : 0});
    });
}

const getCustomerList = async (mongooseQuery) => {
    return await Customer.aggregate([
        {
            $project : {
                "id": "$_id",
                "firstName": "$firstName",
                "lastName": "$lastName",
                "name" : { 
                    $concat : ["$firstName", " ", "$lastName"]
                }
            }
        }
    ])
    .match({
        name : mongooseQuery.customer
    })
    .then((data) => {
        return data.map((value) => value.id)
    });
}

const getVehicleList = async (mongooseQuery) => {
   return await Vehicle.find({
        licensePlate: mongooseQuery.vehicle
    }).then((data) => {
        return data.map((value) => value._id);
    });
}

interface OrderQuery {
    status : string,
    type: string,
    customerName: string,
    licensePlate: string
}

const makeMongooseQuery = (q : OrderQuery) : any => {
    let query =  {
        customer: {$regex: ".*" + q.customerName + ".*" , $options: "i"},
        vehicle: {$regex: ".*" + q.licensePlate + ".*" , $options: "i"},
    };

    if (q.status !== "") {
        query["status"] = {$eq: q.status};
    }
    if (q.type !== "") {
        query["type"] = {$eq: q.type};
    }


    return query;
}

const makeQuery = (req : express.Request)  : OrderQuery=> {
    return {
        status: (req.query.status) ? (req.query.status as string) : "",
        type: (req.query.type) ? (req.query.type as string) : "",
        customerName: (req.query.customerName) ? (req.query.customerName as string): "",
        licensePlate: (req.query.licensePlate) ? (req.query.licensePlate as string): "",
    }
}

export default {all, id, create, update, remove, filter, verify};
