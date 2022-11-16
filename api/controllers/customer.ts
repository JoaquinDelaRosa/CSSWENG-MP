import { randomUUID } from 'crypto';
import express = require('express');
import { Customer } from '../models/customer';
import { ALL_ROLES, Roles } from '../models/enum';
import { makeCustomerArrayView, makeCustomerView } from '../projections/customer';

const all = async (req: express.Request, res: express.Response) => {
    const count = await Customer.countDocuments({});

    Customer.find({})
    .skip(parseInt(req.query.skip as string))
    .limit(parseInt(req.query.limit as string))
    .then ((data) => {
        res.json({data: makeCustomerArrayView(data), count: count});
    })
}

const id = async (req: express.Request, res: express.Response) => {
    Customer.findOne({_id: req.query.id})
    .then((data) => {
        res.json(makeCustomerView(data));
    })
}

const create = (req: express.Request, res: express.Response) => {
    const id = randomUUID()
    Customer.create({_id: id, ...req.body, })
        .then((result) => {
            console.log(result);
            res.json({...req.body, id: id});
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            res.end();
        });
}

const update = (req: express.Request, res: express.Response) => {
    Customer.updateOne({_id : req.query.id}, req.body, (error) => {
        if(error) {
            console.log(error);
            res.json(null);
        }
        else {
            res.json(req.body);
        }
    })
}

const remove = (req : express.Request, res : express.Response) => {
    Customer.deleteOne({_id: req.query.id})
    .then ((result) => {
        res.end();
    })
    .catch((error) => {
        console.log(error);
        res.end();
    })
}

const filter = async (req: express.Request, res: express.Response) => {
    const query : CustomerQuery = makeQuery(req);
    const count = await Customer.find(makeMongooseQuery(query)).countDocuments();

    console.log(query);
    Customer.aggregate([
        {
            $project : {
                "id": "$_id",
                "firstName": "$firstName",
                "lastName": "$lastName",
                "mobileNumber": "$mobileNumber",
                "email": "$email",
                "name" : { 
                    $concat : ["$firstName", " ", "$lastName"]
                }
            }
        }
    ])
    .match(makeMongooseQuery(query))
    .skip(parseInt(req.query.skip as string))
    .limit(parseInt(req.query.limit as string))
    .then((result) => {
        res.json({data: makeCustomerArrayView(result), count: count});
        res.end();
    }).catch((err) => {
        console.log(err);
        res.end();
    })
}

interface CustomerQuery {
    name : string,
    email: string,
    mobileNumber: string,
}

const makeMongooseQuery = (q : CustomerQuery) : any => {
    let query =  {
        name: {$regex: ".*" + q.name + ".*" , $options: "i"},
        email: {$regex: ".*" + q.email + ".*" , $options: "i"},
        mobileNumber: {$regex: ".*" + q.mobileNumber + ".*" , $options: "i"}
    }

    return query;
}

const makeQuery = (req : express.Request) : CustomerQuery => {
    return {
        name: (req.query.name) ? (req.query.name as string) : "",
        email: (req.query.email) ? (req.query.email as string) : "",
        mobileNumber: (req.query.mobileNumber) ? (req.query.mobileNumber as string) : "",
    }
}

export default {all, id, create, update, remove, filter};