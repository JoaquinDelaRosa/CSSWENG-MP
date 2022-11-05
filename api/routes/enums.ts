import express = require('express');
import controller from "../controllers/enums";
const router = express.Router();

router.post('/user/roles', controller.roles);
router.post('/order/statuses', controller.statuses); 
router.post('/order/types', controller.types); 

export default router;