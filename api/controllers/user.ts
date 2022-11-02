/*
 * GET users listing.
 */
import express = require('express');
import { User } from '../models/user';
import { Roles } from '../models/roles';
import { makeUserArrayView, makeUserView } from '../projections/user';
import { ValidateWrapper } from '../middleware/validation';

const router = express.Router();

router.get("/all",  async (req: express.Request, res: express.Response) => {
    ValidateWrapper(req, res, [Roles.ADMIN], () => {
        User.find({})
        .skip(parseInt(req.query.skip as string))
        .limit(parseInt(req.query.limit as string))
        .then ((data) => {
            res.json(makeUserArrayView(data));
        })
    })
});

router.get("/id", async (req: express.Request, res: express.Response) => {
    ValidateWrapper(req, res, [Roles.ADMIN], () => {
        User.find({id: req.query.id})
        .then((data) => {
            res.json(makeUserView(data));
        })
    })
})

router.post("/create", (req: express.Request, res: express.Response) => {
    ValidateWrapper(req, res, [Roles.ADMIN], () => {
        User.create(req.body, (error, result) => {
            console.log(error);
            return result;
        })
        res.json(req.body);
        res.end();
    })
})

router.post("/update", (req: express.Request, res: express.Response) => {
    ValidateWrapper(req, res, [Roles.ADMIN], () => {
        User.updateOne({id : req.query.id}, req.body, (error) => {
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
    ValidateWrapper(req, res, [Roles.ADMIN], () => {
        User.deleteOne({id: req.query.id})
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
    ValidateWrapper(req, res, [Roles.ADMIN], () => {
        const query : UserQuery = makeQuery(req);

        User.find({username: query.username})
        .skip(parseInt(req.query.skip as string))
        .limit(parseInt(req.query.limit as string))
        .then((result) => {
            res.json(makeUserArrayView(result));
            res.end();
        }).catch((err) => {
            console.log(err);
            res.end();
        })
    })
})


interface UserQuery {
    username : string
}

const makeQuery = (req : express.Request) => {
    return {
        username: (req.query.username) ? (req.query.username as string) : ""
    }
}

module.exports = router;