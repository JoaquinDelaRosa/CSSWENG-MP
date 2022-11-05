import express = require('express');
import controller from "../controllers/enums";
const router = express.Router();

router.get('/user/roles', controller.roles);
router.get('/order/statuses', controller.statuses); 
router.get('/order/types', controller.types); 

export default router;