import express = require('express');
import { User } from '../models/user';
import { Roles } from '../models/enum';
import { makeUserArrayView, makeUserView } from '../projections/user';
import { randomUUID } from 'crypto';

const all = async (req: express.Request, res: express.Response) => {
    const count = await User.countDocuments({});

    User.find({})
    .skip(parseInt(req.query.skip as string))
    .limit(parseInt(req.query.limit as string))
    .then ((data) => {
        res.json({data: makeUserArrayView(data), count: count ? count : 0});
    })
};

const id = async (req: express.Request, res: express.Response) => {
    User.findOne({_id: req.query.id})
    .then((data) => {
        res.json(makeUserView(data));
    })
}

const create = (req: express.Request, res: express.Response) => {
    const id = randomUUID();
    User.create({_id: id, ...req.body })
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        res.json({id: id, ...req.body});
        res.end();
    });
}

const update = (req: express.Request, res: express.Response) => {
    User.updateOne({_id : req.query.id}, req.body, (error) => {
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
    User.deleteOne({_id: req.query.id})
    .then ((result) => {
        res.end();
    })
    .catch((error) => {
        console.log(error);
        res.end();
    })
}

const filter = async (req: express.Request, res: express.Response) => {
    const query : UserQuery = makeQuery(req);
    const count = await User.find(makeMongooseQuery(query)).countDocuments();
    
    User.find(makeMongooseQuery(query))
    .skip(parseInt(req.query.skip as string))
    .limit(parseInt(req.query.limit as string))
    .then((result) => {
        res.json({data : makeUserArrayView(result), count: count ? count : 0});
        res.end();
    }).catch((err) => {
        console.log(err);
        res.end();
    })
}


interface UserQuery {
    username : string
}

const makeMongooseQuery = (q : UserQuery) : any => {
    let query =  {
        username: {$regex: ".*" + q.username + ".*" , $options: "i"}
    }

    return query;
}

const makeQuery = (req : express.Request) => {
    return {
        username: (req.query.username) ? (req.query.username as string) : ""
    }
}

export default {all, id, create, update, remove, filter};
