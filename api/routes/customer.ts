/*
 * GET users listing.
 */

import express = require('express');
import { API_PREFIX } from './api';
const router = express.Router();

router.get(API_PREFIX + "customer/all", (req: express.Request, res: express.Response) => {
    
});

export default router;