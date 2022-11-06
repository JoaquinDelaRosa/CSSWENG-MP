import express = require('express');
import validateToken from '../middleware/authValidation';
import controller from '../controllers/customer';
import { ALL_ROLES, Roles } from '../models/enum';
import validateRole from '../middleware/roleValidation';

const router = express.Router();

router.get('/all', validateToken, validateRole([Roles.ADMIN]), controller.all);
router.get('/id', controller.id);
router.post('/create', controller.create);
router.post('/update', controller.update);
router.delete('/delete', controller.remove);
router.get('/filter', controller.filter);

export default router;