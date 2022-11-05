import express = require('express');
import { Customer } from '../models/customer';
import { ALL_ROLES, Roles, StatusEnum, TypeEnum } from '../models/enum';
import { makeCustomerArrayView, makeCustomerView } from '../projections/customer';
import { ValidateWrapper } from '../middleware/validation';

const statuses = async (req: express.Request, res: express.Response) => {
    ValidateWrapper(req, res, ALL_ROLES, () => {
        res.json(StatusEnum)
        res.end()
    })
}

const roles = async (req: express.Request, res: express.Response) => {
    ValidateWrapper(req, res, ALL_ROLES, () => {
        res.json(Roles)
        res.end()
    })
}

const types = async (req: express.Request, res: express.Response) => {
    ValidateWrapper(req, res, ALL_ROLES, () => {
        res.json(TypeEnum)
        res.end()
    })
}

export default {statuses, roles, types};