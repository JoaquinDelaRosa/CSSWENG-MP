/*
 * GET users listing.
 */

import express = require('express');
import { Vehicle } from '../../models/vehicle';
import { API_PREFIX } from '../api';

const router = express.Router();

router.get(API_PREFIX + "Vehicles/all", async function (req: express.Request, res: express.Response) {
    const result = await Vehicle.find({});
    res.json(result);
});

router.get(API_PREFIX + "Vehicles/id", async function (req: express.Request, res: express.Response) {
    const result = await Vehicle.find({id : req.query.id});
    res.json(result);
});



export default router;