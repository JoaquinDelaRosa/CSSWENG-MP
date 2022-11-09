import express = require('express');
import { Customer } from '../models/customer';
import { ALL_ROLES, Roles, StatusEnum, TypeEnum } from '../models/enum';
import { makeCustomerArrayView, makeCustomerView } from '../projections/customer';

const statuses = async (req: express.Request, res: express.Response) => {
    res.json(StatusEnum)
    res.end()
}

const roles = async (req: express.Request, res: express.Response) => {
    res.json(ALL_ROLES)
    res.end()
}

const types = async (req: express.Request, res: express.Response) => {
    res.json(TypeEnum)
    res.end()
}

export default {statuses, roles, types};