import express = require('express');
import controller from "../controllers/enums";
import { ALL_ROLES, Roles } from '../models/enum';
import validateRole from '../middleware/roleValidation';
import validateToken from '../middleware/authValidation';

const router = express.Router();

router.get('/user/roles', validateToken, validateRole(ALL_ROLES), controller.roles);
router.get('/order/statuses', validateToken, validateRole(ALL_ROLES), controller.statuses); 
router.get('/order/types', validateToken, validateRole(ALL_ROLES), controller.types); 

export default router;