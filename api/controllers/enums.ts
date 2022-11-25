import express = require('express');
import {ALL_ROLES, StatusEnum, TypeEnum} from '../models/enum';

const statuses = async (req: express.Request, res: express.Response) => {
    res.json(StatusEnum);
    res.end();
}

const roles = async (req: express.Request, res: express.Response) => {
    res.json(ALL_ROLES);
    res.end()
}

const types = async (req: express.Request, res: express.Response) => {
    res.json(TypeEnum);
    res.end()
}

export default {statuses, roles, types};