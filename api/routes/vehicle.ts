import express = require('express');
import controller from '../controllers/vehicle';
import { ALL_ROLES, Roles } from '../models/enum';
import validateRole from '../middleware/roleValidation';
import validateToken from '../middleware/authValidation';

const router = express.Router();

router.get('/all', validateToken, validateRole(ALL_ROLES), controller.all);
router.get('/id', validateToken, validateRole(ALL_ROLES), controller.id);
router.post('/create', validateToken, validateRole([Roles.ADMIN, Roles.VIEW_EDIT]), controller.create);
router.post('/update', validateToken, validateRole([Roles.ADMIN, Roles.VIEW_EDIT]), controller.update);
router.delete('/delete', validateToken, validateRole([Roles.ADMIN, Roles.VIEW_EDIT]), controller.remove);
router.get('/filter', validateToken, validateRole(ALL_ROLES), controller.filter);
router.get('/count', validateToken, validateRole(ALL_ROLES), controller.count);

export default router;