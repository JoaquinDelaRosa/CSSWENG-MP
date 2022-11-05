import express = require('express');
import { Customer } from '../models/customer';
import { ALL_ROLES, Roles } from '../models/enum';
import { makeCustomerArrayView, makeCustomerView } from '../projections/customer';
import { ValidateWrapper } from '../middleware/validation';

const all = async (req: express.Request, res: express.Response) => {
    ValidateWrapper(req, res, ALL_ROLES, () => {
        Customer.find({})
        .skip(parseInt(req.query.skip as string))
        .limit(parseInt(req.query.limit as string))
        .then ((data) => {
            res.json(makeCustomerArrayView(data));
        })
    })
}

const id = async (req: express.Request, res: express.Response) => {
    ValidateWrapper(req, res, ALL_ROLES, () => {
        Customer.findOne({id: req.query.id})
        .then((data) => {
            res.json(makeCustomerView(data));
        })
    })
}

const create = (req: express.Request, res: express.Response) => {
    ValidateWrapper(req, res, [Roles.ADMIN, Roles.VIEW_EDIT], () => {
        Customer.create(req.body, (error, result) => {
            console.log(error);
            return result;
        })
        res.json(req.body);
        res.end();
    })
}

const update = (req: express.Request, res: express.Response) => {
    ValidateWrapper(req, res, [Roles.ADMIN, Roles.VIEW_EDIT], () => {
        Customer.updateOne({id : req.query.id}, req.body, (error) => {
            if(error) {
                console.log(error);
                res.json(null);
            }
            else {
                res.json(req.body);
            }
        })
    })
}

const remove = (req : express.Request, res : express.Response) => {
    ValidateWrapper(req, res, [Roles.ADMIN, Roles.VIEW_EDIT], () => {
        Customer.deleteOne({id: req.query.id})
        .then ((result) => {
            res.end();
        })
        .catch((error) => {
            console.log(error);
            res.end();
        })
    })
}

const filter = async (req: express.Request, res: express.Response) => {
    ValidateWrapper(req, res, ALL_ROLES, () => {
        const query : CustomerQuery = makeQuery(req);

        console.log(query);
        Customer.aggregate([
            {
                $project : {
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
        .match({"name": {$regex: ".*" + query.name + ".*"}})
        .skip(parseInt(req.query.skip as string))
        .limit(parseInt(req.query.limit as string))
        .then((result) => {
            res.json(makeCustomerArrayView(result));
            res.end();
        }).catch((err) => {
            console.log(err);
            res.end();
        })
    })
}

interface CustomerQuery {
    name : string
}

const makeQuery = (req : express.Request) : CustomerQuery => {
    return {
        name: (req.query.name) ? (req.query.name as string) : ""
    }
}

export default {all, id, create, update, remove, filter};