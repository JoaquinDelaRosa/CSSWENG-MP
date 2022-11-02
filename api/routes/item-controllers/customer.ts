import express = require('express');
import { Customer } from '../../models/customer';
import { ALL_ROLES, Roles } from '../../models/roles';
import { makeCustomerArrayView, makeCustomerView } from '../../projections/customer';
import { ValidateWrapper } from './middleware/validation';

const router = express.Router();

router.get("/all",  async (req: express.Request, res: express.Response) => {
    ValidateWrapper(req, res, ALL_ROLES, () => {
        Customer.find({})
        .skip(parseInt(req.query.skip as string))
        .limit(parseInt(req.query.limit as string))
        .then ((data) => {
            res.json(makeCustomerArrayView(data));
        })
    })
});

router.get("/id", async (req: express.Request, res: express.Response) => {
    ValidateWrapper(req, res, ALL_ROLES, () => {
        Customer.findOne({id: req.query.id})
        .then((data) => {
            res.json(makeCustomerView(data));
        })
    })
})

router.post("/create", (req: express.Request, res: express.Response) => {
    ValidateWrapper(req, res, [Roles.ADMIN, Roles.VIEW_EDIT], () => {
        Customer.create(req.body, (error, result) => {
            console.log(error);
            return result;
        })
        res.json(req.body);
        res.end();
    })
})

router.post("/update", (req: express.Request, res: express.Response) => {
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
})

router.delete("/delete", (req : express.Request, res : express.Response) => {
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
})

router.get("/filter", async (req: express.Request, res: express.Response) => {
    ValidateWrapper(req, res, ALL_ROLES, () => {
        const query : CustomerQuery = makeQuery(req);

        Customer.aggregate([
            {
                $project : {
                    "name" : { 
                        $concat : ["$firstName", " ", "$lastName"]
                    }
                }
            },
            {
                $match :  {"name": {$regex: ".*" + query.name + ".*"}}
            }
        ])
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
})


interface CustomerQuery {
    name : string
}

const makeQuery = (req : express.Request) : CustomerQuery => {
    return {
        name: 
            (req.query.firstName) ? (req.query.firstName as string) : "" + 
            (req.query.lastName) ? (req.query.lastName as string) : ""
    }
}

module.exports = router;