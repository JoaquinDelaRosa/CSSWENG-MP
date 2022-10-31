/*
 * GET users listing.
 */

import express = require('express');
import { Customer } from '../../models/customer';
import { API_PREFIX } from '../api';

const router = express.Router();

router.get(API_PREFIX + "customer/all", (req: express.Request, res: express.Response) => {
    
});

export default router;